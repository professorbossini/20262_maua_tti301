# Quadro 1 — Do arquivo à resposta do Hello

**Natureza:** cenário esperado por leitura. Não é uma captura de execução.

### Condições
A imagem-base é acessível; o pacote Express é instalado; a construção termina; o contêiner inicia com `node index.js`; a porta é publicada corretamente e não há conflito no host.

### Sequência causal
1. O Dockerfile prepara `/app`, dependências e `index.js`.
2. A construção termina e produz uma imagem. Ainda não houve atendimento HTTP pelo servidor.
3. Ao iniciar o contêiner, `CMD` leva o Node a ler `index.js`.
4. `app.get` registra `/hey-docker`; `app.listen` coloca o servidor na porta interna 5200.
5. Um cliente envia `GET /hey-docker` pelo endereço publicado.
6. A rota responde com status HTTP `200` e o corpo abaixo.

```json
{"mensagem":"Hey, Docker!!"}
```

### Duas saídas diferentes
- `up and running inside docker`: mensagem de console do processo servidor.
- `{"mensagem":"Hey, Docker!!"}`: corpo da resposta entregue ao cliente.

A frase impressa pelo código não detecta Docker: ela também seria impressa se o mesmo arquivo fosse executado fora de um contêiner. O ambiente é determinado pelo cenário, não pelo texto do log.

### Contraste
`EXPOSE 5200` sem publicação não disponibiliza automaticamente `localhost:5200` no host. Uma imagem construída também não comprova que o comando de inicialização terminou corretamente.
