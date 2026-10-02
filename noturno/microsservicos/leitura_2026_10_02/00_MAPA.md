# Da criação à consulta: quem faz o quê?

**TTI301 · 02/10/2026 · Integração de microsserviços**

| Serviço | Porta no código | Responsabilidade |
|---|---:|---|
| Lembretes | 4000 | Validar e guardar lembretes; publicar `LembreteCriado`. |
| Observações | 5000 | Guardar observações; publicar `ObservacaoCriada`; aplicar a classificação e publicar `ObservacaoAtualizada`. |
| Consulta | 6000 | Construir a representação de leitura a partir dos eventos; consultar o histórico ao iniciar. |
| Classificação | 7000 | Interpretar o texto e produzir `ObservacaoClassificada`; o arquivo original tem uma importação ausente. |
| Barramento | 10000 | Guardar o evento em memória, repassá-lo aos quatro destinos e disponibilizar o histórico. |

## Caminho pretendido de uma observação

`ObservacaoCriada` → classificação → `ObservacaoClassificada` → observações → `ObservacaoAtualizada` → consulta.

Cada evento desse caminho passa pelo barramento. O classificador não escreve diretamente na base do serviço de observações. A consulta não recalcula a regra de classificação.

## Quatro distinções

- **Recurso:** o lembrete ou a observação guardada pelo serviço responsável.
- **Evento:** uma mensagem com `tipo` e `dados`, descrevendo algo que aconteceu.
- **Resposta HTTP:** o retorno de uma requisição específica; não comprova o estado de todos os serviços.
- **Consulta:** uma representação de leitura construída com os dados recebidos, não a memória compartilhada dos produtores.

## Neste recorte

Há cinco arquivos de referência e uma proposta pontual de importação. O foco está em seguir os dados e interpretar os resultados. Docker, Kubernetes, novas estratégias de entrega e a releitura integral dos Scripts 13–22 ficam fora desta sequência.
