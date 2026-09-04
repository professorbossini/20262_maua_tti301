# Requisições da Aula 5

Todos os testes usam `curl` no terminal reservado ao cliente HTTP.

## 1. Script 06 - serviço de lembretes

No Terminal L:

```bash
npm run script6
```

No Terminal C:

```bash
curl -i http://localhost:4000/saude
```

Crie dois lembretes:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Estudar comunicação entre serviços"}'
```

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Revisar a apostila de microsserviços"}'
```

Liste:

```bash
curl -i http://localhost:4000/lembretes
```

Mantenha o Script 06 ativo durante o núcleo.

## 2. Script 07 - serviço mínimo de observações

No Terminal O:

```bash
npm run script7
```

No Terminal C:

```bash
curl -i http://localhost:5000/saude
curl -i http://localhost:5000/lembretes/1/observacoes
```

Resultado esperado da segunda requisição: `200` com `[]`.

Antes do Script 08, encerre somente o Script 07 com `Control + C` no Terminal O.

## 3. Script 08 - criar e listar observações

No Terminal O:

```bash
npm run script8
```

Entrada inválida:

```bash
curl -i -X POST http://localhost:5000/lembretes/1/observacoes \
  -H "Content-Type: application/json" \
  -d '{}'
```

Crie observações:

```bash
curl -i -X POST http://localhost:5000/lembretes/1/observacoes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Exemplo com dois processos independentes"}'
```

```bash
curl -i -X POST http://localhost:5000/lembretes/1/observacoes \
  -H "Content-Type: application/json" \
  -d '{"texto":"A base da porta 5000 pertence ao serviço de observações"}'
```

```bash
curl -i -X POST http://localhost:5000/lembretes/2/observacoes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Observação associada ao segundo lembrete"}'
```

Liste:

```bash
curl -i http://localhost:5000/lembretes/1/observacoes
curl -i http://localhost:5000/lembretes/2/observacoes
```

## 4. Script 09 - demonstrar n + 1

Mantenha os Scripts 06 e 08 ativos. No Terminal C:

```bash
npm run script9
```

Com dois lembretes, o terminal deve registrar três requisições: uma para obter os lembretes e uma para cada coleção de observações.

## 5. Expansão - Scripts 10 e 11

### 5.1 Trocar o serviço da porta 5000

No Terminal O:

1. pressione `Control + C`;
2. aguarde o prompt;
3. execute:

```bash
npm run script10
```

O estado anterior da porta 5000 foi perdido. Recrie duas observações:

```bash
curl -i -X POST http://localhost:5000/lembretes/1/observacoes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Observação do lembrete 1"}'
```

```bash
curl -i -X POST http://localhost:5000/lembretes/2/observacoes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Observação do lembrete 2"}'
```

Teste a consulta em lote:

```bash
curl -i 'http://localhost:5000/observacoes?lembreteIds=1,2'
```

### 5.2 Trocar o serviço da porta 4000

No Terminal L:

1. pressione `Control + C`;
2. aguarde o prompt;
3. execute:

```bash
npm run script11
```

O estado anterior da porta 4000 foi perdido. Recrie os dois lembretes:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Estudar comunicação síncrona"}'
```

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Comparar n + 1 e agregação"}'
```

Agora o cliente faz uma única requisição:

```bash
curl -i http://localhost:4000/lembretes-com-observacoes
```

O serviço da porta 4000 consulta a porta 5000 e devolve uma representação combinada.

## 6. Reserva - Script 12

Em um terminal livre:

```bash
npm run script12
```

Evento válido:

```bash
curl -i -X POST http://localhost:10000/eventos \
  -H "Content-Type: application/json" \
  -d '{"tipo":"LembreteCriado","dados":{"id":1,"texto":"Exemplo"}}'
```

Evento inválido:

```bash
curl -i -X POST http://localhost:10000/eventos \
  -H "Content-Type: application/json" \
  -d '{}'
```

Listar eventos:

```bash
curl -i http://localhost:10000/eventos
```
