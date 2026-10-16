# Kubernetes e a organização do cluster
Referência: Bossini, itens 4.3.62–4.3.63, PDF 91–92 / rodapé 87–88.
Relação: síntese didática; exemplos numéricos são hipotéticos.

## O problema que permanece depois do Dockerfile
Uma imagem reúne os arquivos e a configuração necessários à aplicação.
Um contêiner é uma instância em execução baseada nessa imagem.
Iniciar o contêiner é apenas uma parte do trabalho: ainda há falhas, atualizações e capacidade a acompanhar.
Kubernetes automatiza o gerenciamento de aplicações em contêineres a partir de uma configuração desejada.
Kubernetes não é um novo arquivo JavaScript, não substitui o Express e não cria a imagem a partir do Dockerfile.

## As unidades, da aplicação à infraestrutura
Imagem: artefato usado como base para iniciar um contêiner.
Contêiner: ambiente isolado em que o processo da aplicação executa.
Pod: unidade de execução do Kubernetes, contendo um ou mais contêineres que pertencem ao mesmo conjunto.
Nó (node): máquina física ou virtual que fornece recursos para os Pods.
Cluster: control plane e nós que, em conjunto, gerenciam e executam as aplicações.

## Relação de inclusão — modelo conceitual, não configuração executável
Cluster
  Control plane: coordena o estado do cluster.
  Nó A: kubelet + runtime + componentes de rede.
    Pod A: um contêiner da aplicação.
    Pod B: um contêiner da aplicação.
  Nó B: kubelet + runtime + componentes de rede.
    Pod C: um contêiner da aplicação.

## Contagens que não devem ser confundidas
No desenho: um cluster, dois nós de trabalho, três Pods e três contêineres de aplicação.
Três Pods não exigem três máquinas: o nó A hospeda dois deles.
Cinco microsserviços não obrigam cinco nós; a distribuição depende de recursos e configuração.
Nesta introdução, cada Pod do exemplo Hello contém um contêiner.
Isso é uma escolha do exemplo, não uma regra que proíba Pods com mais contêineres.

## Estado desejado e estado observado
Desejado: a quantidade e o modelo de instâncias solicitados para a aplicação.
Observado: o que o cluster informa que existe ou está pronto naquele momento.
Reconciliar: comparar esses estados e tomar ações para aproximar o observado do desejado.
Exemplo hipotético: desejamos uma instância, mas nenhuma está disponível; o sistema tentará atender à configuração.
O resultado depende de recursos, imagem acessível, rede, permissões e componentes funcionando.

## O que não muda automaticamente
A lógica de negócio continua no JavaScript.
Variáveis em memória continuam pertencendo ao processo que as criou.
Iniciar outro Pod não copia automaticamente o objeto lembretes de um processo que terminou.
A comunicação entre aplicações precisa de endereços e configuração apropriados.
Acesso externo e descoberta de serviços serão tratados depois do primeiro Deployment.
