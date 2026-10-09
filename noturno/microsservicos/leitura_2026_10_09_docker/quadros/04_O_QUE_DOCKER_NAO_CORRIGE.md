# Quadro 4 — O que uma imagem construída não comprova

**Natureza:** análise do código recebido. Não foi realizado um teste Docker.

| Situação | Resultado esperado e condição |
|---|---|
| GET /lembretes no serviço ativo, sem dados | Pode responder `200` e `{}`. Essa rota lê a memória local e não publica eventos. |
| POST válido com barramento inacessível | O código grava o lembrete antes do `await axios.post`. A publicação falha e o fluxo não chega normalmente à linha do `201`. Não concluir que nada foi gravado. |
| Classificador sem importar Axios | Ao tratar `ObservacaoCriada`, o acesso a `axios.post` provoca erro; o `catch` vazio pode esconder o problema e a rota responde `200`. A dependência instalada não cria a variável `axios` no arquivo. |
| Reinício do processo com dados só em objetos JavaScript | Os objetos em memória são recriados. Docker não transforma automaticamente esses objetos em dados persistentes. |
| Imagem reconstruída após editar o código | Um contêiner já existente não é atualizado automaticamente só porque uma imagem foi reconstruída. |

### Cuidado com a previsão de erro
A forma textual da falha e o que será exibido no console dependem do ambiente. Não apresentamos uma mensagem capturada. No fluxo de POST de lembretes, com Express 5 e seu tratamento padrão, uma rejeição pode resultar em resposta de erro; o fato decisivo é que a gravação local antecede a tentativa de publicação.

### Escopo desta aula
Construir a receita do ambiente e interpretar seus limites. Não reescrever o barramento, não concluir uma implantação integrada e não introduzir Compose, Kubernetes ou persistência como se já estivessem implementados.
