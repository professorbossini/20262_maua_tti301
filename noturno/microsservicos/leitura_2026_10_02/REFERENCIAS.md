# Referências e origem — 02/10/2026

Base: ZIP fornecido nesta conversa, snapshot `29622331d71c03d1aac164f875709b63f2bf7d2a`. A data gravada nas entradas do ZIP é a do empacotamento do snapshot; não foi usada como data individual de alteração dos arquivos.

As referências abaixo foram localizadas na cópia anexada de `01_apostila_microsservicos.pdf` (145 páginas). Nela, a página 61 do leitor corresponde à página impressa 57. Os intervalos localizam conceitos: os arquivos atuais não são transcrições literais de uma só seção.

## Lembretes
- Cópia: `scripts/01_lembretes.js`.
- Origem: `noturno/microsservicos/lembretes/06_inclusao_notificando_barramento.js`.
- Apostila: 4.3.29 e 4.3.33; pp. impressas 38-39 e 42 (PDF 42-43 e 46).

## Barramento
- Cópia: `scripts/02_barramento.js`.
- Origem: `noturno/microsservicos/barramento-de-eventos/index.js`.
- Apostila: 4.3.28, 4.3.38, 4.3.43 e 4.3.50; pp. impressas 36-38, 47, 55-56 e 66-67 (PDF 40-42, 51, 59-60 e 70-71).

## Observações
- Cópia: `scripts/03_observacoes.js`.
- Origem: `noturno/microsservicos/observacoes/index.js`.
- Apostila: 4.3.31, 4.3.42, 4.3.45 e 4.3.47; pp. impressas 40-41, 54-55 e 57-60 (PDF 44-45, 58-59 e 61-64).

## Classificação
- Cópia: `scripts/04_classificacao_original.js`.
- Origem: `noturno/microsservicos/classificacao/index.js`.
- Apostila: 4.3.41-4.3.44 e 4.3.47; pp. impressas 52-57 e 59-60 (PDF 56-61 e 63-64).

## Consulta
- Cópia: `scripts/05_consulta.js`.
- Origem: `noturno/microsservicos/consulta/index.js`.
- Apostila: 4.3.35-4.3.38, 4.3.46-4.3.47 e 4.3.51; pp. impressas 43-47, 58-60 e 67-68 (PDF 47-51, 62-64 e 71-72).

## Adaptação explicitamente proposta
`04b_classificacao_importacao_proposta.js`: uma importação de axios, como na linha 2 do bloco 4.3.26 da apostila, p. impressa 57 / PDF 61. O restante do comportamento é preservado. A proposta não foi aplicada às pastas originais.

## Correspondências que não são equivalências
A apostila antiga usa PUT em alguns exemplos de criação. O snapshot atual usa POST: a leitura acompanha o código atual, sem trocar seu método. O evento de lembrete usa `contador`; a base do produtor usa `id`. Os serviços simples não usam o contrato com id de evento e versão presente em `aula06_eventos`.

## Apoio técnico consultado, separado da apostila
- Axios: importação com CommonJS, https://axios-http.com/docs/intro (consulta em 02/10/2026).
- JavaScript/MDN: comportamento de try/catch, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch (consulta em 02/10/2026).

Essas fontes apoiam a leitura técnica, sem substituir a organização da apostila. Os quadros são cenários didáticos construídos a partir dos arquivos, com premissas explícitas; não são transcrições da apostila.
