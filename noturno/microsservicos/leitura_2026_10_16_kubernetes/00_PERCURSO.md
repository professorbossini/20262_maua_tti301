# Kubernetes: quem mantém os contêineres em execução?
TTI301 · 16/10/2026 · Noturno online

## Ponto de partida
Bossini, 01_apostila_microsservicos.pdf, item 4.3.62: PDF 91 / rodapé 87.
Na etapa anterior, cada serviço foi empacotado em uma imagem e executado em um contêiner Docker.
Agora a pergunta é como gerenciar a execução dessas aplicações e reagir quando o estado muda.

## Objetivos
- Distinguir imagem, contêiner, Pod, nó, cluster e Deployment.
- Identificar quem recebe os pedidos, escolhe o nó e acompanha a execução.
- Interpretar o que os primeiros comandos do kubectl solicitariam.
- Separar a criação de um Deployment da disponibilidade de sua aplicação.
- Reconhecer que reiniciar um processo não recupera automaticamente seus dados em memória.

## Sequência
1. Retomada curta do Dockerfile e do serviço de lembretes recebidos.
2. Motivação para Kubernetes e organização de um cluster.
3. Control plane, componentes de um nó e estado desejado.
4. kubectl: versões, nós, ajuda, criação e consulta de Deployment.
5. Resultados esperados, limites e atividade de leitura.

## Limite desta aula
Chegamos ao item 4.3.68.4, páginas 97–98 do PDF / 93–94 no rodapé.
Os itens 4.3.66–4.3.67 localizam alternativas de ambiente, sem procedimento de instalação.
Proxy, acesso à aplicação, logs, exec, Services e escalabilidade ficam para a continuação.
Não configuraremos Compose nem migraremos os cinco serviços para o Kubernetes nesta aula.
