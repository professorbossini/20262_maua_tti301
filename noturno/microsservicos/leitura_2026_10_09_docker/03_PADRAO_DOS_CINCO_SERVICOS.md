# Uma receita comum; cinco aplicações diferentes

Os cinco Dockerfiles propostos têm o mesmo conteúdo. Cada um pertence ao diretório do respectivo serviço, ao lado do seu `package.json` e `package-lock.json`.

| Diretório do serviço | Linha de `start` em package.json | Comando da base | Porta no código |
|---|---:|---|---:|
| `lembretes` | 14 | `nodemon 06_inclusao_notificando_barramento.js` | 4000 |
| `barramento-de-eventos` | 8 | `nodemon index.js` | 10000 |
| `observacoes` | 8 | `nodemon index.js` | 5000 |
| `consulta` | 8 | `nodemon index.js` | 6000 |
| `classificacao` | 8 | `nodemon index.js` | 7000 |

### O que fica igual
`FROM`, `WORKDIR`, a instalação das dependências, a cópia do projeto e `CMD ["npm", "start"]`.

### O que muda
O contexto contém arquivos distintos e dependências próprias. Dentro de cada imagem, `npm start` consulta o `package.json` daquela aplicação. Portanto, Dockerfiles iguais não tornam as cinco imagens idênticas.

### Por que não escrever node index.js em todos
Na pasta `lembretes`, o arquivo ativo tem outro nome. O `start` consolidado já identifica esse arquivo. O campo `main` não escolhe o comando de `npm start`; neste caso, quem o escolhe é `scripts.start`.

### O que foi preservado
O uso de `nodemon` pertence à base recebida. Ele está em `dependencies` nos cinco projetos. A proposta não elimina esse pacote nem afirma ser um perfil endurecido de produção. Sem uma montagem ou sincronização adicional, uma edição no host não altera os arquivos copiados na imagem.

### O que ainda não foi resolvido
A base contém endereços `localhost` entre processos e a importação ausente de Axios em `classificacao/index.js`. Empacotar os arquivos não altera esses comportamentos. A publicação de cinco portas não conecta automaticamente as chamadas internas.

Referência: Bossini, itens 4.3.58–4.3.61, pp. 82–87 (PDF 86–91); nomes, comandos e portas conferidos no snapshot `6dff7a32285745fd5c7051937a0ad82604e62535`.
