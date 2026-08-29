# TTI301 - Aula prática 4 - pacote refeito

## Escopo

Este pacote vai somente até o Script 05:

1. servidor mínimo e rota de saúde;
2. `GET /lembretes`;
3. `POST /lembretes`;
4. `GET /lembretes/:id` e `404`;
5. validação do corpo e status `400`.

Não há `PATCH`, `DELETE`, logs, cliente automático ou serviço de observações neste recorte.

## Instalação

Abra um terminal nesta pasta:

```bash
npm install
```

## Regra operacional mais importante

Execute apenas um servidor por vez. Antes de trocar de script:

1. clique no terminal do servidor;
2. pressione `Control + C`;
3. confirme que o prompt reapareceu;
4. só então inicie o próximo script.

Todos usam a porta 4000. Se o processo anterior continuar ativo, o novo script falhará com `EADDRINUSE` ou você continuará consultando o código antigo.

## Dois terminais

- Terminal 1: servidor Node;
- Terminal 2: cliente `curl`.

O fluxo principal usa `curl`, pois ele não depende de recursos pagos de extensão. O Thunder Client é opcional e deve ser usado apenas com `New Request`, sem Collections e sem salvar a requisição.

## Execução

```bash
npm run script1
npm run script2
npm run script3
npm run script4
npm run script5
```

Ou diretamente:

```bash
node lembretes/01_servidor_minimo.js
node lembretes/02_get_lembretes.js
node lembretes/03_post_lembretes.js
node lembretes/04_get_lembrete_por_id.js
node lembretes/05_validacao_e_status.js
```

## Dados em memória

Ao encerrar e reiniciar o servidor, a coleção volta a `{}` e o contador volta a zero. Nos Scripts 04 e 05, crie o lembrete e faça os testes de consulta sem reiniciar o processo.

## Lista 4

```bash
npm run exercicios
```

A atividade consolida somente os conceitos dos Scripts 01 a 05.
