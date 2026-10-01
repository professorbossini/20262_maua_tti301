# TTI301 · Aula 06 · Eventos, consulta e classificação

## Conteúdo

A partir do serviço de lembretes e do barramento introduzidos na aula teórica, construímos um sistema com cinco processos: lembretes (4000), observações (5000), consulta (6000), classificação (7000) e barramento (10000). O objetivo é observar publicação, distribuição, projeção de leitura, classificação e recuperação de eventos.

## Preparação

Esta pasta é um projeto próprio. Não substitua as pastas oficiais `lembretes`, `observacoes` ou `barramento-de-eventos`.

No terminal aberto **nesta pasta**:

```bash
node --version
npm ci
npm run verificar
npm test
npm run ensaio
```

Use Node 22 ou mais recente. `npm ci` usa o lockfile incluído. Não envie `node_modules` ao GitHub. O ensaio inicia processos temporários em portas livres e encerra apenas esses processos; não modifica o código nem os serviços já abertos. A verificação pede que as portas da aula estejam livres antes de começar.

## Três etapas

| Etapa | Lembretes 4000 | Observações 5000 | Consulta 6000 | Classificação 7000 | Barramento 10000 |
|---|---|---|---|---|---|
| 1 · Publicar e consultar | Script 14 | Script 15 | Script 16 | desligado | Script 13 |
| 2 · Classificar | Script 14 | Script 18 | Script 16 | Script 17 | Script 19 |
| 3 · Recuperar | manter Script 14 | manter Script 18 | substituir por Script 21 | manter Script 17 | manter Script 19 |

Na passagem da etapa 1 para a 2, encerre todos os processos da etapa 1 e comece com bases vazias. Na passagem da etapa 2 para a 3, encerre **somente a consulta**; o barramento precisa continuar ativo para conservar o histórico. Nunca inicie dois scripts na mesma porta.

Cada servidor ocupa seu terminal. Use outro terminal para os comandos do arquivo `REQUISICOES_AULA_06.md`. Não há dependência de extensão de cliente HTTP.

## Arquivos

- `13`: barramento com três destinos, registro e distribuição.
- `14`: criação de lembretes e publicação de `LembreteCriado`.
- `15`: observações e publicação de `ObservacaoCriada`.
- `16`: consulta simples atualizada pelos eventos; ainda vulnerável à duplicação.
- `17`: classificação pela presença da palavra `importante`.
- `18`: serviço proprietário aplica a classificação e emite `ObservacaoAtualizada`.
- `19`: barramento com o quarto destino, classificação.
- `20`: módulo da projeção com deduplicação, versões e pendências; não abre servidor.
- `21`: consulta que usa o módulo 20 e recupera o histórico.
- `22`: experimento de duplicação e ordem; executa uma vez e termina.
- `exercicios_aula_05.js`: lista anterior, preservada para consulta.
- `exercicios_aula_06.js`: consumidor de auditoria com TODOs, porta 7100.

## Contrato

O envelope contém `id` (identificador do **evento**), `tipo` e `dados`. Em `LembreteCriado`, o identificador do lembrete permanece em `dados.contador`, como no código da disciplina. Observações usam `dados.id` e `dados.lembreteId`. O campo `versao` é uma extensão didática para não substituir um estado recente por um estado antigo durante a recuperação.

## Limites do modelo

Este barramento é didático: registra eventos em memória, confirma recebimento com 202 e depois tenta entregá-los. Não há persistência, autenticação, retentativas automáticas ou garantia de entrega. Um 202 **não confirma o processamento por todos os consumidores**. As chamadas continuam sendo HTTP; a separação está na publicação e no processamento posterior.

O Script 16 é propositalmente simples. Os Scripts 20–21 acrescentam mecanismos explícitos para demonstrar duplicatas e reprocessamento. O replay recupera somente eventos que chegaram ao barramento e permaneceram no seu histórico. Não recupera um evento cuja publicação falhou antes disso, nem restaura o histórico de um barramento reiniciado. Cada produtor ainda pode sofrer gravação local seguida de falha de publicação; essa limitação é parte da discussão, não uma solução de produção.

As chamadas da aula usam `127.0.0.1`. No computador de cada aluno, esse endereço é o próprio computador. As portas 5000 e 6000 podem ter restrições em outros aplicativos; os testes previstos usam `curl`, não abas do navegador.

## Referências

Ver `REFERENCIAS_E_ADAPTACOES.md`. Os cabeçalhos dos scripts indicam as seções e páginas impressas da apostila de microsserviços do professor Rodrigo Bossini. Não foram incluídas cópias das apostilas.
