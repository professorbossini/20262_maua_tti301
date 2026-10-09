# Quadro 2 — Contexto, cópia e cache

**Natureza:** raciocínio sobre arquivos e etapas, sem construção de imagem nesta aula.

## Arquivos do exemplo Hello
```text
hello_docker/
├── index.js
├── package.json
├── Dockerfile
└── .dockerignore
```

Um `node_modules/` criado no host seria excluído pelo `.dockerignore`. As dependências da imagem são instaladas na etapa `RUN`, no ambiente da imagem. Um arquivo `.env` local também é excluído nesta proposta; isso não configura automaticamente variáveis de ambiente dentro do contêiner.

## Duas operações COPY
- `COPY package.json ./`: traz a descrição das dependências para `/app`.
- `COPY . .`: traz o restante do contexto permitido para o diretório de trabalho, depois da instalação.

## Cenário A — mudou somente index.js
Se o contexto dos manifestos, a imagem-base, a configuração e o cache anterior permanecerem compatíveis, as etapas até a instalação podem ser reutilizadas. A cópia final do código precisa refletir a nova versão.

## Cenário B — mudou a lista de dependências
A cópia dos manifestos deixa de corresponder ao cache; a instalação e as etapas posteriores podem precisar ser refeitas. Nos serviços, os dois manifestos são `package.json` e `package-lock.json`.

## Cenário C — o lockfile foi excluído por engano
No Dockerfile dos serviços, o `COPY package.json package-lock.json ./` não encontra todas as entradas necessárias. O problema ocorre na construção, antes de qualquer rota ser atendida.

## Regra
O cache é uma possibilidade condicionada aos insumos e ao ambiente de construção, não uma promessa de que toda alteração será instantânea.
