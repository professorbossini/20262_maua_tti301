# Passo a passo – Comunicação de todos os microsserviços no Kubernetes

Ambiente: **Docker Desktop com Kubernetes ativado**. Imagens no Docker Hub: `profnelsonaguiar/<servico>`.

## Visão geral

```
                (NodePort)                       (NodePort)              (NodePort)
 Postman ──► lembretes-service:4000     observacoes-service:5000     consultas-service:6000
                    │                            │                           ▲
                    ▼                            ▼                           │ GET /lembretes
             ┌──────────────────── barramento-de-eventos-service:10000 ──────┴───────┐
             │   POST /eventos  → reenvia para TODOS os Services ClusterIP abaixo    │
             └───────┬──────────────────┬───────────────────┬──────────────────┬─────┘
                     ▼                  ▼                   ▼                  ▼
   lembretes-clusterip-service  observacoes-clusterip  consultas-clusterip  classificacao-clusterip
            :4000                  -service :5000         -service :6000       -service :7000
```

**no Kubernetes, um Pod encontra outro pelo NOME DO SERVICE**.
O nome `barramento` (usado no Docker Compose) **não existe** no cluster — por isso
Observações, Consultas e Classificação foram alterados para `barramento-de-eventos-service`.

### Fluxo de eventos

| Evento | Quem emite | Quem reage |
|---|---|---|
| `LembreteCriado` | Lembretes | Consultas |
| `ObservacaoCriada` | Observações | Consultas, Classificação |
| `ObservacaoClassificada` | Classificação | Observações |
| `ObservacaoAtualizada` | Observações | Consultas |

---

## Passo 0 – Conferência do que já estava pronto (Barramento + Lembretes)

A comunicação: Lembretes chama `barramento-de-eventos-service:10000`
e o Barramento chama `lembretes-clusterip-service:4000`; os nomes, portas e labels batem.


1. **`body-parser` não está no `package.json`** de barramento, lembretes e observações.
   Só funcionava porque o Express 5 o instala internamente. Trocado por `express.json()`.
2. **Lembretes**: `await axios.post(...)` sem `try/catch` → se o barramento caísse, o
   `PUT /lembretes` devolvia erro 500 mesmo com o lembrete salvo. Agora trata o erro.
3. **Lembretes**: `contador = 0` era variável global implícita → `let contador = 0`.
4. **`lembretes-deployment.yaml`**: `imagePullPolicy: IfNotPresent` com imagem sem tag
   (`latest`) faz o Kubernetes **reaproveitar a imagem antiga** depois de um `docker push`.
   Trocado para `Always`.
5. `lembretes.yaml` (Pod avulso) não tem `labels`, então nenhum Service o enxerga.
   Não é erro, mas não use junto com o Deployment — se ele estiver rodando, apague:
   `kubectl delete pod lembretes`.

---

## Passo 1 – Código: apontar todos para o Barramento do Kubernetes

Já feito nos arquivos. Em cada serviço existe agora a constante:

```js
// Endereço do Barramento no Kubernetes (nome do Service ClusterIP)
const URL_BARRAMENTO = "http://barramento-de-eventos-service:10000/eventos";
```

Arquivos alterados: `observacoes/index.js`, `consultas/index.js`, `classificacao/index.js`.

Correções extras:
- **Classificação**: o `axios.post` não tinha `.catch()`. Uma falha de rede derrubava o
  processo Node (o nodemon fica em *app crashed* e o Pod para de responder). Adicionado `.catch`.
- **Consultas**: verifica se o lembrete existe antes de inserir/atualizar observação.
- **Observações**: `uuid` v14 é só ESM; substituído pelo nativo `crypto.randomUUID()`.

## Passo 2 – Código: Barramento envia para todos

Em `barramento-de-eventos/index.js` os blocos comentados foram substituídos por uma lista:

```js
const SERVICOS = [
    { nome: 'Lembretes',     url: 'http://lembretes-clusterip-service:4000/eventos' },
    { nome: 'Observações',   url: 'http://observacoes-clusterip-service:5000/eventos' },
    { nome: 'Consultas',     url: 'http://consultas-clusterip-service:6000/eventos' },
    { nome: 'Classificação', url: 'http://classificacao-clusterip-service:7000/eventos' }
];

SERVICOS.forEach(servico => {
    axios.post(servico.url, evento, { timeout: 5000 })
        .then(() => console.log(`Evento ${evento.tipo} enviado para ${servico.nome}.`))
        .catch(err => console.error(`Erro ao enviar evento para ${servico.nome}:`, err.message));
});
```

> Os nomes da lista **têm que ser idênticos** ao `metadata.name` dos Services ClusterIP.

## Passo 3 – Manifestos Kubernetes (criados em `implantacao/kubernetes/`)

| Arquivo | Deployment | ClusterIP (interno) | NodePort (externo) |
|---|---|---|---|
| `observacoes-deployment.yaml` | `observacoes-deployment` | `observacoes-clusterip-service:5000` | `observacoes-service` |
| `consultas-deployment.yaml` | `consultas-deployment` | `consultas-clusterip-service:6000` | `consultas-service` |
| `classificacao-deployment.yaml` | `classificacao-deployment` | `classificacao-clusterip-service:7000` | — (só interno) |

Em cada um, o label `app: <servico>` aparece em **três lugares** que precisam ser iguais:
`selector.matchLabels`, `template.metadata.labels` e `selector` do Service.

## Passo 4 – Construir e publicar as imagens

Execute dentro de `D:\arq-sist-comp\microsservicos\kubernetes` (Docker Desktop aberto e `docker login` feito):

```bash
cd barramento-de-eventos && docker build -t profnelsonaguiar/barramento-de-eventos . && docker push profnelsonaguiar/barramento-de-eventos && cd ..
```
```bash
cd lembretes && docker build -t profnelsonaguiar/lembretes . && docker push profnelsonaguiar/lembretes && cd ..
```
```bash
cd observacoes && docker build -t profnelsonaguiar/observacoes . && docker push profnelsonaguiar/observacoes && cd ..
```
```bash
cd consultas && docker build -t profnelsonaguiar/consultas . && docker push profnelsonaguiar/consultas && cd ..
```
```bash
cd classificacao && docker build -t profnelsonaguiar/classificacao . && docker push profnelsonaguiar/classificacao && cd ..
```

## Passo 5 – Aplicar no cluster

```bash
cd implantacao/kubernetes
```
```bash
kubectl apply -f barramento-de-eventos-deployment.yaml -f lembretes-deployment.yaml -f lembretesservice.yaml -f observacoes-deployment.yaml -f consultas-deployment.yaml -f classificacao-deployment.yaml
```

Como Barramento e Lembretes já existiam, force a recriação para pegar a imagem nova:

```bash
kubectl rollout restart deployment barramento-de-eventos-deployment lembretes-deployment
```

> Dica: aplique **Consultas por último** (ou reinicie-o depois que o barramento estiver de pé),
> pois ele lê o histórico `GET /eventos` do barramento ao iniciar.

## Passo 6 – Conferir

```bash
kubectl get deployments,pods,services
```

Todos os Pods devem estar `Running`. Anote as portas NodePort (ex.: `4000:3xxxx/TCP`).

## Passo 7 – Testar o fluxo completo (Postman ou curl)

Substitua `PORTA_LEMBRETES`, `PORTA_OBS`, `PORTA_CONSULTAS` pelos NodePorts do Passo 6.

1. Criar lembrete:
```bash
curl -X PUT http://localhost:PORTA_LEMBRETES/lembretes -H "Content-Type: application/json" -d "{\"texto\":\"Fazer cafe\"}"
```
2. Criar observação no lembrete 1 (com a palavra *importante*):
```bash
curl -X PUT http://localhost:PORTA_OBS/lembretes/1/observacoes -H "Content-Type: application/json" -d "{\"texto\":\"isso e importante\"}"
```
3. Consultar visão consolidada — a observação deve aparecer com `status: "importante"`:
```bash
curl http://localhost:PORTA_CONSULTAS/lembretes
```

## Passo 8 – Ver os logs (diagnóstico)

```bash
kubectl logs deployment/barramento-de-eventos-deployment
```

Você deve ver `Evento ... enviado para Lembretes/Observações/Consultas/Classificação`.
Os outros: `kubectl logs deployment/classificacao-deployment` (troque o nome).

### Erros comuns

| Mensagem no log | Causa provável |
|---|---|
| `getaddrinfo ENOTFOUND barramento` | Imagem antiga ainda com `http://barramento:10000` → refaça build/push e `rollout restart` |
| `getaddrinfo ENOTFOUND xxx-clusterip-service` | Service não criado ou nome diferente do YAML |
| `ECONNREFUSED` | Service existe, mas Pod não está pronto ou `targetPort` errado |
| `ErrImagePull` / `ImagePullBackOff` | Imagem não foi enviada ao Docker Hub ou nome errado |
| Observação fica `aguardando` | Classificação fora do ar ou não recebe `ObservacaoCriada` |

## Backup

Os `index.js` originais foram copiados para `_backup_original/`.
