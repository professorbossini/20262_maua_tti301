# Referências e adaptações da Aula 06

## Base utilizada

Snapshot fornecido: `20262_maua_tti301-main(5).zip`. Foram lidos os arquivos da pasta **noturno**. A pasta `matutino` não é o ponto de partida desta aula e não é modificada.

Apostila fornecida: `01_apostila_microsservicos.pdf`, professor Rodrigo Bossini, 145 páginas no arquivo. A numeração impressa começa quatro páginas depois: página impressa 38 = página 42 do leitor PDF.

| Conteúdo | Seções | Páginas impressas | Páginas do leitor PDF |
|---|---|---|---|
| Barramento manual e projetos | 4.3.27–4.3.28 | 34–38 | 38–42 |
| Emissão e recepção de eventos | 4.3.29–4.3.34 | 38–43 | 42–47 |
| Base e serviço de consulta | 4.3.35–4.3.39 | 43–48 | 47–52 |
| Classificação e eventos genéricos | 4.3.40–4.3.48 | 48–63 | 52–67 |
| Eventos perdidos e recuperação | 4.3.49–4.3.52 | 63–68 | 67–72 |
| Rejeições não tratadas | 2.2 | 3–4 | 7–8 |

## Conteúdo preservado

Mantemos os serviços, portas e os tipos `LembreteCriado`, `ObservacaoCriada`, `ObservacaoClassificada` e `ObservacaoAtualizada`. Mantemos `dados.contador` no evento de lembrete. A regra de classificação conserva a palavra `importante` e os estados `aguardando`, `importante` e `comum` da apostila.

## Adaptações declaradas

1. A criação usa POST, como nos scripts atuais do noturno. A apostila antiga usa PUT em alguns exemplos; os arquivos originais não foram alterados.
2. Usamos `express.json()`, cuja substituição do `body-parser` já é discutida na seção 2.1 da própria apostila.
3. Usamos `node:crypto.randomUUID()` em vez do pacote externo `uuid`.
4. Cada chamada Axios tem timeout e tratamento explícito de erro. Rejeições desligadas da cadeia da rota não são deixadas sem tratamento.
5. O barramento confirma com **202 após registrar em memória**, antes de aguardar os consumidores. Uma fila local serializa suas tentativas. Isso evita prender uma requisição em uma cadeia circular quando um consumidor publica outro evento. Não é garantia durável nem um broker profissional.
6. Os eventos recebem id próprio. O barramento detecta reenvio do mesmo id e rejeita conflito de conteúdo. A comparação do exemplo pressupõe a mesma serialização do payload reenviado; não é canonicalização geral de JSON.
7. Nos consumidores, tipo não tratado é verificado explicitamente. A apostila apresenta `try/catch` vazio para descartar tipos; aqui não usamos exceções como decisão normal nem escondemos falhas de negócio.
8. Os Scripts 20–22 acrescentam Set de eventos processados, versão de observação e guarda de observações pendentes. Esses mecanismos são **extensões didáticas**, não trechos literais da apostila.
9. O replay manual e o estado `pronta` tornam visível a recuperação. Não há cursor persistente, retries automáticos, outbox, transação distribuída, replay de todos os produtores ou garantia exactly-once.
10. Para reduzir conflitos com exemplos oficiais e versões anteriores, o laboratório fica na subpasta isolada `aula06_eventos`. Cada processo continua com estado e porta próprios; o package.json único é apenas uma conveniência deste laboratório, não um modelo de implantação independente.

## Documentação técnica complementar consultada em 10/09/2026

- Express: `https://expressjs.com/en/guide/error-handling/`.
- Axios: `https://axios-http.com/docs/req_config`.
- GitHub Desktop: `https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop`.

As versões diretas foram fixadas em Express 5.2.1 e Axios 1.20.0, as mesmas linhas de dependência presentes no snapshot, sem introduzir nova ferramenta gráfica. A verificação de versão não equivale a auditoria de segurança de todas as dependências.
