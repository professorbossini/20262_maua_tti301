# TTI301 - Aula prática 5

## Tema

Segundo microsserviço, observações associadas a lembretes, problema das `n + 1` requisições, comunicação síncrona e primeira ponte para eventos.

## Ponto da apostila

- `01_apostila_microsservicos.pdf`:
  - seções 4.3.16 a 4.3.23, páginas impressas 25-31: serviço de observações;
  - seção 4.3.24, páginas impressas 31-32: `n + 1` requisições;
  - seção 4.3.25, páginas impressas 32-33: comunicação síncrona;
  - seções 4.3.26 a 4.3.28, páginas impressas 33-38: comunicação assíncrona e barramento, usados como ponte e reserva.
- `http_apostila.pdf`, páginas impressas 2-10: cliente, servidor, requisição, resposta, métodos e status.

## Instalação

A partir desta pasta:

```bash
npm install
```

O `package-lock.json` acompanha o projeto. `node_modules` é reconstruído pelo comando acima e não deve ser enviado ao GitHub.

## Organização dos terminais

```text
Terminal L - serviço de lembretes, porta 4000
Terminal O - serviço de observações, porta 5000
Terminal C - comandos curl e clientes de execução única
```

Todos os testes da aula usam `curl` no Terminal C.

## Núcleo

```bash
npm run script6
npm run script7
npm run script8
npm run script9
```

- O Script 06 permanece ativo no Terminal L.
- No Terminal O, execute apenas um serviço da porta 5000 por vez.
- Antes de trocar o Script 07 pelo 08, pressione `Control + C` no Terminal O e aguarde o prompt.
- O Script 09 é um cliente de execução única e deve ser executado no Terminal C com os Scripts 06 e 08 ativos.

## Expansão: comunicação síncrona

```bash
npm run script10
npm run script11
```

- O Script 10 substitui o Script 08 na porta 5000 e acrescenta consulta em lote.
- O Script 11 substitui o Script 06 na porta 4000 e devolve lembretes com observações em uma única resposta ao cliente.
- A troca de scripts reinicia as bases em memória; recrie os recursos seguindo `REQUISICOES_AULA_05.md`.

## Reserva

```bash
npm run script12
```

O Script 12 inicia um barramento didático na porta 10000. Nesta etapa, ele apenas recebe, valida e armazena eventos.

## Lista 5

```bash
npm run exercicios5
```

A lista usa a porta 5100 e pede a implementação de um serviço de comentários associados a artigos.
