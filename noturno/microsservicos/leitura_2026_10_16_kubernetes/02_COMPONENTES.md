# Quem faz o quê no Kubernetes?
Referência principal: Bossini, itens 4.3.64–4.3.65, PDF 93–94 / rodapé 89–90.
Relação: síntese da apostila; notas de precisão estão identificadas ao final.

## Control plane — coordenação
kube-apiserver: expõe a API pela qual pedidos de gerenciamento chegam ao cluster.
etcd: armazena os dados de configuração e estado do cluster; não é automaticamente o banco de lembretes.
kube-scheduler: identifica Pods sem nó atribuído e seleciona um nó adequado.
kube-controller-manager: executa controladores que comparam estado desejado e observado e solicitam ajustes.
cloud-controller-manager: integra funções do cluster ao provedor de nuvem, quando essa integração se aplica.

## Nó de trabalho — execução
kubelet: agente do nó; acompanha os Pods atribuídos àquela máquina e seu estado.
Container runtime: software que gerencia a execução dos contêineres no nó.
kube-proxy: no modelo da apostila, participa das regras de rede associadas a Services.
O kubelet não substitui o scheduler: um atua no nó; o outro seleciona onde um Pod será alocado.
O runtime não escolhe sozinho o estado desejado da aplicação.

## Duas APIs diferentes
API de gestão: kubectl conversa com o kube-apiserver sobre nós, Pods e Deployments.
API da aplicação: um cliente conversa com o Express sobre lembretes e observações.
Consultar os nós não chama GET /lembretes.
Uma resposta de sucesso da API de gestão não comprova toda a lógica de negócio.

## Caminho conceitual de um Deployment
1. O cliente kubectl solicita a criação do objeto Deployment pela API.
2. O estado desejado é registrado no cluster.
3. Controladores organizam a criação das instâncias especificadas.
4. O scheduler seleciona um nó para cada Pod ainda não alocado.
5. O kubelet acompanha a realização da especificação no nó; o runtime executa os contêineres.
6. O estado observado é atualizado; a disponibilidade pode demorar a aparecer.

## Precisões técnicas — documentação oficial, não transcrição da apostila
Um Deployment gerencia ReplicaSets; estes mantêm a quantidade de Pods. Não configuraremos ReplicaSets manualmente hoje.
O Pod é uma unidade de execução; o Deployment é um objeto de gerenciamento dessas instâncias.
O kube-proxy pode ser substituído por implementações de rede que realizam essa função.
A apostila associa o runtime ao Docker. Hoje a integração do nó usa a CRI, por exemplo com containerd ou CRI-O.
O dockershim integrado foi removido no Kubernetes 1.24; isso não impede usar imagens construídas com Docker.
Detalhes de plugins e migração de runtime não fazem parte da aula.

## Controle tem limites
Recriar uma instância não significa conservar a memória do processo anterior.
Um cluster local com um único nó de trabalho não oferece outra máquina para absorver a perda desse nó.
Nem toda indisponibilidade é uma falha no código; podem faltar recursos ou acesso à imagem.
Referências das precisões: K1–K6 em REFERENCIAS_E_ADAPTACOES.md.
