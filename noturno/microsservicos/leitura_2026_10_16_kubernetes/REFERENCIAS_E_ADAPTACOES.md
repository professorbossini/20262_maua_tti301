# Referências e limites do material
TTI301 · 16/10/2026 · v1

## Fonte didática principal
B1. Rodrigo Bossini, 01_apostila_microsservicos.pdf, versão fornecida nas pastas da disciplina (145 páginas).
- 4.3.62: introdução ao Kubernetes — PDF 91 / rodapé 87.
- 4.3.63: arquitetura, cluster, nós e Pods — PDF 92 / rodapé 88.
- 4.3.64: control plane — PDF 93 / rodapé 89.
- 4.3.65: componentes dos nós — PDF 94 / rodapé 90.
- 4.3.66–4.3.67: alternativas de ambiente — PDF 94–96 / rodapé 90–92. Apenas localização; sem instalação nesta aula.
- 4.3.68.1–4.3.68.3: versões, nós e forma geral do kubectl — PDF 96–97 / rodapé 92–93.
- 4.3.68.4: primeiro Deployment — PDF 97–98 / rodapé 93–94.
O limite principal é 4.3.68.4. Não se afirma que os itens seguintes já foram ministrados.

## Base do repositório
ZIP recebido: 20262_maua_tti301-main(2).zip.
Identificador no comentário do ZIP: dfabfc49ff1c253ac172af670f3218833f2d5735.
As cópias em base_recebida/lembretes são integrais e byte a byte iguais ao ZIP.
O Dockerfile contém EXPOSE 4000. Os outros quatro Dockerfiles recebidos declaram 10000, 5000, 6000 e 7000, respectivamente.
O JavaScript preserva localhost. Nenhuma versão com IP apresentada ao vivo foi inferida ou reconstruída.
Esta pasta é uma adição isolada: não substitui os Dockerfiles nem o JavaScript do repositório.

## Documentação oficial consultada em 16/10/2026 — precisões explícitas
K1. Componentes: https://kubernetes.io/docs/concepts/overview/components/
K2. Nós: https://kubernetes.io/docs/concepts/architecture/nodes/
K3. Pods: https://kubernetes.io/docs/concepts/workloads/pods/
K4. Deployments: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
K5. ReplicaSet: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/
K6. Remoção do dockershim: https://kubernetes.io/blog/2022/02/17/dockershim-faq/
K7. Tutorial de Deployment: https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/
K8. kubectl version: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_version/
K9. kubectl create deployment: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_deployment/

## O que foi adaptado
As sínteses, os exemplos numéricos, os quadros e a atividade são formulações didáticas novas, baseadas nas seções indicadas.
A imagem e o nome do Deployment do comando principal seguem o exemplo de Bossini. A linha foi unida para leitura, sem alterar a intenção.
O comando version --client é complemento da documentação oficial, não transcrição literal da apostila.
A cadeia Deployment/ReplicaSet/Pod, a observação sobre CRI e a possibilidade de substituir kube-proxy são precisões identificadas.
Não se repete como fato atual a associação exclusiva entre Docker e runtime da apostila antiga.
Nenhuma saída foi capturada de um cluster e nenhuma imagem foi construída ou baixada nesta preparação.
Não foram produzidos manifestos YAML dos cinco serviços, arquivo Compose ou configuração de produção.
