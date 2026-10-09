# Quatro elementos, quatro funções

| Elemento | O que representa | O que não representa |
|---|---|---|
| Código JavaScript | As regras, rotas e respostas da aplicação. | Não especifica sozinho todo o ambiente de implantação. |
| Dockerfile | Uma receita textual para construir uma imagem. | Não é um arquivo JavaScript. |
| Imagem | O artefato que reúne o sistema de arquivos e a configuração para iniciar contêineres. | Não é, por si só, um processo atendendo requisições. |
| Contêiner | Uma instância criada a partir de uma imagem, com seu estado de execução. | Não é uma cópia viva da pasta do computador. |

**Analogia limitada:** a apostila compara imagem com classe e contêiner com objeto. A ideia útil é uma descrição permitir várias instâncias. Não estamos dizendo que Docker funciona como a orientação a objetos do JavaScript.

### Dois momentos
- **Construção:** `FROM`, `WORKDIR`, `COPY` e `RUN` preparam o conteúdo e a configuração da imagem. `RUN npm install` ou `RUN npm ci` instala dependências nessa etapa, salvo reutilização de cache.
- **Inicialização:** o comando registrado em `CMD` será usado por padrão quando o contêiner for iniciado. Ele não coloca o servidor em funcionamento durante a construção.
- Instruções como `EXPOSE` registram metadados; nem toda linha cria uma camada nova de arquivos.

**Aplicação ao Mac:** um caminho como `/app` é interno ao ambiente Linux da imagem, não é `/Users/victormaimone` nem uma pasta do Finder. O Node da imagem é independente do Node que alguém instalou no Mac.

Referência principal: Bossini, itens 4.3.54–4.3.56, pp. 72–79 (PDF 76–83). Precisões de Dockerfile: documentação oficial relacionada em `REFERENCIAS_E_ADAPTACOES.md`.
