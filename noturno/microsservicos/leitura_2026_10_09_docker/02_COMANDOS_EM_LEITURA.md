# Construir e iniciar: interpretação, sem execução em aula

## Exemplo A — construir o Hello
Premissa: a pasta de contexto é `hello_docker`, com seus quatro arquivos.

```text
docker build -t tti301-hello:v1 .
```

- `build` solicita a construção de uma imagem.
- `-t tti301-hello:v1` atribui um nome e uma tag à imagem; não é o nome de um contêiner.
- O ponto final é o **contexto de construção**. Neste exemplo, o Dockerfile padrão está nessa mesma pasta. O ponto não significa sempre “pasta do Dockerfile”: um Dockerfile pode ser indicado separadamente em outros usos.
- Se a imagem-base e os pacotes puderem ser obtidos e as etapas terminarem sem erro, a imagem poderá ser criada. Nenhum hash de imagem foi medido nesta aula.

## Exemplo B — criar e iniciar um contêiner
Premissa: a imagem do exemplo A foi construída com sucesso.

```text
docker run -p 127.0.0.1:5200:5200 tti301-hello:v1
```

- `run` cria e inicia um novo contêiner a partir da imagem indicada.
- O prefixo `127.0.0.1` limita esta publicação à interface local do computador host.
- O primeiro `5200` é a porta publicada no host; o segundo é a porta de destino no contêiner.
- O comando padrão do Dockerfile é `node index.js`. Ele é diferente da etapa de instalação das dependências.
- Para o exemplo, a rota seria `http://localhost:5200/hey-docker`.

## Exemplo C — mesma porta interna, outro endereço externo
```text
docker run -p 127.0.0.1:8080:5200 tti301-hello:v1
```

A aplicação continua ouvindo a porta interna 5200. O acesso pelo host passaria a `http://localhost:8080/hey-docker`. Mudar o mapeamento não reescreve `app.listen`.

## Exemplo D — vocabulário de observação
| Expressão lida | Informação procurada |
|---|---|
| `docker images` | Imagens locais disponíveis. |
| `docker ps` | Contêineres em execução naquele instante. |
| `docker logs <container>` | Saídas do processo encaminhadas ao mecanismo de logs. Não é uma prova de que todos os eventos chegaram aos consumidores. |

Referência: Bossini, itens 4.3.56–4.3.59, pp. 80–85 (PDF 84–89). Adaptação: nomes simbólicos legíveis e publicação restrita a `127.0.0.1`. Resultados condicionais; não são capturas de execução.
