# Estado desejado, recuperação e limites
Referência: Bossini 4.3.64 e 4.3.68.4, PDF 93 e 97–98 / rodapé 89 e 93–94.
Relação: cenários didáticos, não experimentos executados. Precisões: K2–K6 nas referências.

## Cenário 1 — Onde está a falha?
Foi solicitada uma instância de uma aplicação. O Deployment existe e READY mostra 0/1.
Pode faltar um nó adequado, a imagem pode não estar acessível ou o processo pode não ficar pronto.
A informação disponível não permite escolher uma única causa.
Conclusão: aceite do objeto e disponibilidade são etapas distintas.

## Cenário 2 — Um nó ficou indisponível
Há dois nós aptos antes da falha e uma instância gerenciada pela aplicação.
O nó que hospedava a instância fica indisponível e essa condição é detectada pelo cluster.
Uma substituição pode ser criada e alocada em outro nó adequado, conforme o controle e as políticas aplicáveis.
Não é uma transferência instantânea do processo; há detecção, decisões, criação e inicialização.
Se só houver um nó de trabalho disponível no ambiente, não há outra máquina apta para essa alocação.
Conclusão: autorrecuperação depende de condições e não promete ausência de interrupção.

## Cenário 3 — O objeto lembretes estava na memória
No script recebido, lembretes é criado como objeto vazio no início do processo.
Uma nova instância do programa cria outra memória; não recupera sozinha os lembretes anteriores.
Os Pods substitutos também não recebem automaticamente a memória do processo perdido.
Conclusão: orquestrar execução e persistir dados são problemas diferentes.

## Cenário 4 — A URL ainda contém localhost
O script recebido publica em http://localhost:10000/eventos.
Contêineres de um mesmo Pod compartilham rede e podem comunicar-se por localhost.
Se o barramento estiver em outro Pod, localhost não é o endereço dele.
Não estamos juntando os cinco microsserviços em um único Pod para contornar a configuração.
Conclusão: Kubernetes não reescreve as URLs do JavaScript. O acesso entre serviços será tratado depois.

## Limite da aplicação desta aula
O Deployment do exemplo usa a imagem bootcamp indicada na apostila.
Ele não implanta lembretes, barramento, observações, consulta e classificação em conjunto.
Não foi criado Service nem foram publicados endereços de acesso externo.
O próximo item da apostila é 4.3.68.5: proxy para acesso aos Pods.
