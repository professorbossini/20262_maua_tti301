# Requisições da Aula 06

Execute os comandos **no terminal C**, enquanto os servidores permanecem nos seus terminais. Cada bloco pode ser copiado como um todo. `-i` mostra o status e os cabeçalhos; `-sS` oculta a barra de progresso sem esconder erros de conexão. Não use as respostas de um estágio anterior para inferir o estado de um estágio reiniciado.

## Etapa 1 · Scripts 13, 14, 15 e 16

Inicie L/14, O/15, Q/16 e B/13, cada um em seu terminal. Não envie POST antes de todos estarem prontos.

```bash
curl -sS -i --max-time 5 http://127.0.0.1:4000/saude
curl -sS -i --max-time 5 http://127.0.0.1:5000/saude
curl -sS -i --max-time 5 http://127.0.0.1:6000/saude
curl -sS -i --max-time 5 http://127.0.0.1:10000/saude
```

Criar o primeiro lembrete, esperado 201 e id 1 em uma execução limpa:

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:4000/lembretes   -H 'Content-Type: application/json'   -d '{"texto":"Estudar eventos"}'
```

Criar uma observação, esperado 201:

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:5000/lembretes/1/observacoes   -H 'Content-Type: application/json'   -d '{"texto":"Revisar a leitura da consulta"}'
```

Consultar fila e projeção:

```bash
curl -sS --max-time 5 http://127.0.0.1:10000/estado
curl -sS --max-time 5 http://127.0.0.1:6000/lembretes
curl -sS --max-time 5 http://127.0.0.1:10000/eventos
```

Espere `pendentes: 0` e `distribuindo: false` antes de comparar a projeção com o resultado final. Uma resposta imediata pode refletir apenas parte do processamento.

## Etapa 2 · Classificação

Encerre os quatro processos da etapa 1. Inicie L/14, O/18, Q/16, K/17 e B/19. Todas as bases recomeçam vazias; recrie os dados.

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:4000/lembretes   -H 'Content-Type: application/json' -d '{"texto":"Organizar a entrega"}'
curl -sS -i --max-time 5 -X POST http://127.0.0.1:5000/lembretes/1/observacoes   -H 'Content-Type: application/json' -d '{"texto":"Este prazo e importante"}'
curl -sS -i --max-time 5 -X POST http://127.0.0.1:5000/lembretes/1/observacoes   -H 'Content-Type: application/json' -d '{"texto":"Separar os arquivos"}'
```

Aguardar o processamento e consultar:

```bash
sleep 2
curl -sS --max-time 5 http://127.0.0.1:10000/estado
curl -sS --max-time 5 http://127.0.0.1:5000/lembretes/1/observacoes
curl -sS --max-time 5 http://127.0.0.1:6000/lembretes
```

Se o barramento ainda estiver distribuindo, repita a consulta após alguns segundos. Esperado: uma observação `importante`, outra `comum`, ambas na versão 2. O primeiro POST pode mostrar o estado inicial; não use a ordem de chegada de respostas como garantia geral.

## Etapa 3 · Consulta indisponível e replay

Pare **somente Q**. Mantenha B, L, O e K ligados. Crie outro lembrete:

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:4000/lembretes   -H 'Content-Type: application/json' -d '{"texto":"Criado com consulta desligada"}'
curl -sS --max-time 5 http://127.0.0.1:10000/estado
```

O 201 confirma a criação e o aceite pelo barramento. A falha ao entregar a Q aparece no terminal B. Aguarde a fila esvaziar. Reinicie primeiro Q/16 e veja a base vazia:

```bash
curl -sS --max-time 5 http://127.0.0.1:6000/lembretes
```

Pare Q/16 e inicie Q/21. Ele solicita o histórico ao B/19, que **não foi reiniciado**:

```bash
curl -sS --max-time 5 http://127.0.0.1:6000/estado
curl -sS --max-time 5 http://127.0.0.1:6000/lembretes
curl -sS -i --max-time 5 -X POST http://127.0.0.1:6000/reprocessar
curl -sS --max-time 5 http://127.0.0.1:6000/lembretes
```

Esperado após a recuperação: os dois lembretes, as duas observações classificadas do primeiro e nenhuma observação duplicada após repetir o replay.

## Contrato e tipo ignorado

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:10000/eventos   -H 'Content-Type: application/json' -d '{}'
curl -sS -i --max-time 5 -X POST http://127.0.0.1:6000/eventos   -H 'Content-Type: application/json'   -d '{"id":"exemplo-neutro","tipo":"EventoDesconhecido","dados":{}}'
```

Esperados: 400 no envelope inválido; 200 e `resultado: ignorado` no consumidor robusto para o evento válido sem handler.

## Reserva · Falha da publicação

Faça apenas depois do replay e antes do encerramento. Pare somente B. L continua ligado:

```bash
curl -sS -i --max-time 5 -X POST http://127.0.0.1:4000/lembretes   -H 'Content-Type: application/json' -d '{"texto":"Criado durante a falha do barramento"}'
curl -sS --max-time 5 http://127.0.0.1:4000/lembretes
```

Esperado: 503 explicando a falha parcial e o registro visível na base de L. Não repita o POST automaticamente: ele pode criar outro registro. Reiniciar B não recupera seu histórico nem publica sozinho o evento perdido. Esta é uma limitação intencional do laboratório.

## Script 22 · Experimento sem servidores novos

```bash
npm run script22
```

Esperado: apenas uma observação, `importante`, versão 2; o evento repetido é identificado e a versão antiga não sobrescreve a mais nova.

## Lista 6 · Consumidor de auditoria (7100)

Com `npm run exercicios6` em outro terminal:

```bash
curl -sS -i --max-time 5 http://127.0.0.1:7100/eventos
curl -sS -i --max-time 5 -X POST http://127.0.0.1:7100/eventos   -H 'Content-Type: application/json'   -d '{"id":"auditoria-1","tipo":"LembreteCriado","dados":{"contador":1,"texto":"Estudar"}}'
curl -sS -i --max-time 5 -X POST http://127.0.0.1:7100/eventos   -H 'Content-Type: application/json'   -d '{"id":"auditoria-1","tipo":"LembreteCriado","dados":{"contador":1,"texto":"Estudar"}}'
curl -sS --max-time 5 http://127.0.0.1:7100/resumo
```

Antes da resolução, as rotas retornam 501. Depois: 200 na consulta, 201 no primeiro registro, 200 no duplicado e total 1 no resumo.
