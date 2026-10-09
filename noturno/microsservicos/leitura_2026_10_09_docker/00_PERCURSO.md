# TTI301 — Do Dockerfile à imagem de um microsserviço
## Aula online · 09/10/2026 · v1.0

**Pergunta central:** ter o código de um serviço é suficiente para colocá-lo em um contêiner e fazê-lo conversar com os demais?

### O caminho da aula
1. Separar código, Dockerfile, imagem e contêiner.
2. Ler o pequeno servidor `hello_docker/index.js` e sua resposta.
3. Ler o Dockerfile: imagem-base, diretório, dependências, cópia, porta e comando inicial.
4. Entender o contexto, o arquivo `.dockerignore` e a reutilização de etapas.
5. Interpretar construção e criação de contêineres em exemplos escritos.
6. Aplicar um padrão comum aos cinco serviços da base consolidada.
7. Explicar por que `localhost`, falhas da aplicação e estado em memória continuam importantes.

### Ponto de partida e chegada
Mazzei informou ter chegado ao item 4.3.55, p. 75. Esta aula segue os itens 4.3.56–4.3.60 e discute o limite necessário para os testes do item 4.3.61. Não configura Docker Compose nem Kubernetes.

### Arquivos em leitura
- `hello_docker/index.js`, `package.json`, `Dockerfile` e `.dockerignore`.
- `../lembretes/package.json`, `Dockerfile` e `06_inclusao_notificando_barramento.js`.
- Os Dockerfiles das outras quatro pastas e o quadro comparativo dos comandos `start`.
- Quatro quadros com resultados esperados e a atividade de leitura.

Os códigos e os resultados são estudados como texto. Os quadros não são registros de uma execução: cada previsão informa suas condições. Não é necessário instalar Docker para acompanhar esta leitura.
