# Atividade de leitura — Kubernetes
TTI301 · 16/10/2026
Use os arquivos desta pasta. Não é necessário instalar ou executar Kubernetes.
Os cenários são didáticos e independentes de contas, nuvem ou terminal.

## 1. Unidades da arquitetura
Um cluster possui dois nós de trabalho. O primeiro executa dois Pods, cada qual com um contêiner. O segundo executa um Pod com dois contêineres.
Quantos clusters, nós de trabalho, Pods e contêineres de aplicação há? Explique por que Pod não é sinônimo de máquina.

## 2. Responsabilidades
Associe os papéis aos componentes: receber pedidos de gestão; guardar o estado do cluster; selecionar um nó; acompanhar Pods no nó; executar contêineres.
Use kube-apiserver, etcd, kube-scheduler, kubelet e container runtime.

## 3. O que realmente foi confirmado?
Depois da mensagem deployment.apps/meu-primeiro-deployment created, a consulta mostra READY 0/1, UP-TO-DATE 1 e AVAILABLE 0.
O pedido falhou? A aplicação já pode ser considerada pronta? Explique o que cada informação permite concluir e o que não permite.

## 4. Recuperação e memória
O serviço de lembretes grava recursos em um objeto JavaScript na memória. O Pod é substituído por outro.
Os lembretes anteriores estarão automaticamente presentes no novo processo? Justifique usando o arquivo original entregue em base_recebida.

## 5. Comunicação
Uma aplicação em um Pod chama localhost:10000. O barramento está em outro Pod.
Por que a chamada não passa a funcionar apenas porque ambos estão no mesmo cluster? Em que situação localhost pode alcançar outro contêiner?

## Entrega
Registre respostas curtas com justificativa. Leve as dúvidas para a próxima aula da sua turma.
Esta lista não introduz implantação completa, Service, proxy ou configuração de escalabilidade.
