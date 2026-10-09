# Referências, origem e adaptações

## Base fornecida
- Repositório: snapshot `6dff7a32285745fd5c7051937a0ad82604e62535`, do ZIP `20262_maua_tti301-main(1).zip` enviado para esta preparação.
- Escopo: somente as cinco pastas de serviços em `noturno/microsservicos`. A pasta `aula06_eventos` é outra implementação e não fornece o padrão desta aula.
- Os arquivos originais copiados para o pacote de leitura estão preservados byte a byte. Dockerfile e `.dockerignore` são adições propostas, não arquivos apresentados como aprovados por Mazzei.

## Apostila principal
Bossini, `01_apostila_microsservicos.pdf`, arquivo de 145 páginas fornecido na pasta microsserviços. Nesta edição, a página impressa n corresponde à página n+4 no leitor PDF.

| Assunto | Item | Página impressa | Página do leitor PDF |
|---|---|---:|---:|
| Ponto informado por Mazzei: obtenção do Docker | 4.3.55 | 75–77 | 79–81 |
| Hello e seu index.js | 4.3.56 / Bloco 4.3.34 | 77–78 | 81–82 |
| Dockerfile do Hello | 4.3.56 / Bloco 4.3.35 | 79 | 83 |
| Construir, iniciar e portas | 4.3.56–4.3.57 | 80–82 | 84–86 |
| Dockerfile e dockerignore de lembretes | 4.3.58 / Bloco 4.3.36 | 82–84 | 86–88 |
| Testar lembretes e preparar demais serviços | 4.3.59–4.3.60 | 85–86 | 89–90 |
| Comunicação e testes do conjunto | 4.3.61 | 86–87 | 90–91 |

## Diferenças explícitas em relação à apostila
1. O Hello conserva rota, resposta e porta do exemplo. O cabeçalho e a formatação foram adaptados para leitura com números de linha.
2. O exemplo da p. 79 usa `node:14`; o de serviços usa `node:alpine`. Nesta proposta usamos `node:24-alpine`. A linha 24 é LTS na consulta de 09/10/2026; a linha 14 está em fim de vida. A tag não fixa um digest: não afirmamos reprodutibilidade bit a bit nem que a imagem foi baixada nesta preparação.
3. A apostila escreve que `EXPOSE` torna o contêiner disponível na porta. A precisão da documentação oficial é: `EXPOSE` documenta; a publicação no host é configurada separadamente. A explicação da aula faz essa distinção.
4. O Dockerfile comum mantém `CMD ["npm", "start"]`, mas copia os dois manifestos e usa `npm ci`, pois os cinco serviços fornecem lockfile. O Hello mantém `npm install` e não tem lockfile gerado nesta preparação. Não criamos um lockfile fictício.
5. Não alteramos `scripts.start`, as dependências, os endereços `localhost`, o contrato dos eventos ou o classificador. O material descreve os problemas remanescentes em vez de corrigi-los silenciosamente.
6. O `.dockerignore` da apostila exclui `node_modules`; acrescentamos `.git`, `.DS_Store`, logs npm e arquivos `.env` como extensão didática. Isso não substitui uma revisão de segredos antes de publicar.
7. Exemplos de publicação usam `127.0.0.1` para restringir a interface do host. Todos são objetos de leitura, não passos de operação nesta aula.
8. A comparação de contextos e cache é aprofundamento didático. Compose e Kubernetes ficam fora da implantação deste pacote.

## Documentação oficial consultada em 09/10/2026
- D1 — Dockerfile reference: https://docs.docker.com/reference/dockerfile/
- D2 — Build context / .dockerignore: https://docs.docker.com/build/concepts/context/
- D3 — Optimize cache usage: https://docs.docker.com/build/cache/optimize/
- D4 — Port publishing: https://docs.docker.com/engine/network/port-publishing/
- D5 — Networking overview: https://docs.docker.com/engine/network/
- N1 — npm ci: https://docs.npmjs.com/cli/v11/commands/npm-ci/
- N2 — Node releases: https://nodejs.org/en/about/previous-releases
- N3 — Node end of life: https://nodejs.org/en/about/eol

Essas referências externas esclarecem as adaptações técnicas acima; não substituem a sequência didática da apostila.
