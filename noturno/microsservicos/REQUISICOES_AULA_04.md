# Requisições da Aula 4 - recorte até o Script 05

## Fluxo seguro

Use dois terminais:

- **SERVIDOR:** executa um arquivo Node e permanece ocupado;
- **CLIENTE:** envia requisições com `curl`.

Antes de iniciar outro script, encerre o servidor atual com `Control + C`.

## Thunder Client

Collections não são usadas neste material. Na versão gratuita:

1. clique em `New Request`;
2. escolha o método;
3. informe a URL;
4. para POST, selecione `Body` -> `JSON`;
5. clique em `Send`;
6. não clique em Collections e não é necessário salvar.

Se houver qualquer dúvida no Thunder, use os comandos `curl` abaixo.

## Script 01 - saúde

Servidor:

```bash
npm run script1
```

Cliente:

```bash
curl -i http://localhost:4000/saude
```

Esperado: status `200` e JSON com `status: ok`.

## Script 02 - listar

Pare o Script 01 e execute:

```bash
npm run script2
```

Cliente:

```bash
curl -i http://localhost:4000/lembretes
```

Esperado: status `200` e corpo `{}`.

## Script 03 - criar e listar

Pare o Script 02 e execute:

```bash
npm run script3
```

Criar:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Estudar microsserviços"}'
```

Listar sem reiniciar o servidor:

```bash
curl -i http://localhost:4000/lembretes
```

Esperado: criação com `201` e listagem contendo o id `1`.

## Script 04 - consultar por id

Pare o Script 03 e execute:

```bash
npm run script4
```

Primeiro crie um lembrete no processo novo:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"Rever rotas"}'
```

Depois consulte, sem reiniciar:

```bash
curl -i http://localhost:4000/lembretes/1
curl -i http://localhost:4000/lembretes/999
```

Esperado: `200` para o id 1 e `404` para o id 999.

## Script 05 - validação

Pare o Script 04 e execute:

```bash
npm run script5
```

Teste inválido:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"   "}'
```

Esperado: `400 Bad Request`.

Teste válido:

```bash
curl -i -X POST http://localhost:4000/lembretes \
  -H "Content-Type: application/json" \
  -d '{"texto":"  Estudar status HTTP  "}'
```

Esperado: `201`, texto sem espaços laterais e `concluido: false`.

Sem reiniciar:

```bash
curl -i http://localhost:4000/lembretes/1
curl -i http://localhost:4000/lembretes/999
```
