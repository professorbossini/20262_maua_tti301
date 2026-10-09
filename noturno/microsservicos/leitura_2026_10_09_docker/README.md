# TTI301 · Docker e Dockerfile · 09/10/2026

Material de leitura que continua o item 4.3.55 da apostila de microsserviços do Bossini. O percurso está em `00_PERCURSO.md`.

## Conteúdo
- Um exemplo Hello com JavaScript, Dockerfile, package.json e `.dockerignore`.
- Um padrão de Dockerfile aplicado aos cinco serviços da base consolidada, nas pastas irmãs desta pasta.
- Quadros de respostas esperadas, arquivos de referência e uma atividade de consolidação.

## Propostas e originais
Os arquivos JavaScript e manifestos dos serviços são os originais do snapshot informado em `REFERENCIAS_E_ADAPTACOES.md`. Os novos Dockerfiles e arquivos `.dockerignore` são propostas didáticas. Eles não constituem uma implantação integrada pronta: os endereços entre serviços e problemas de aplicação continuam no código recebido.

## Uso para estudo
Os arquivos podem ser lidos no VS Code. O conteúdo não depende de Docker, Node ou extensões instalados para ser acompanhado como texto. Os comandos mostrados são analisados, não executados no percurso de exposição. As respostas dos quadros são previsões com condições explícitas.

## Limites
Não inclui Compose, Kubernetes, armazenamento persistente, configuração de rede entre os cinco contêineres nem certificação de funcionamento em produção. Não houve construção de imagem ou execução HTTP real na preparação deste pacote. Os lockfiles recebidos foram preservados; o exemplo Hello usa `npm install`, sem um lockfile inventado.
