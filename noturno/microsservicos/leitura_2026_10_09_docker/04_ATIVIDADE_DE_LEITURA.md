# Atividade de consolidação — Dockerfile

Considere os Dockerfiles e o exemplo Hello fornecidos. Responda por escrito, usando os arquivos como evidência. Não é preciso construir imagens nem iniciar contêineres.

1. No Dockerfile do Hello, quais instruções instalam dependências e qual define o programa que será iniciado? Explique por que trocar `CMD` por `RUN` não tem o mesmo efeito.
2. No mapeamento `127.0.0.1:8080:5200`, qual é a porta do host, qual é a porta do contêiner e qual seria o endereço completo da rota `/hey-docker`? O `EXPOSE 5200` sozinho produz esse mapeamento?
3. O Dockerfile comum usa `COPY package.json package-lock.json ./` e `RUN npm ci`. O que seria esperado se o lockfile não existisse? Por que `node_modules` fica fora do contexto, mas o lockfile precisa continuar dentro?
4. Os Dockerfiles dos cinco serviços são iguais. Explique por que as imagens não precisam ser iguais e por que `CMD ["npm", "start"]` inicia o arquivo correto na pasta `lembretes`, mesmo sem um `index.js` nessa pasta.
5. A imagem de lembretes foi construída e o serviço está ativo. Uma chamada ao barramento usa `http://localhost:10000/eventos`, mas ele está em outro contêiner. Por que publicar as duas portas não basta? Cite uma limitação adicional do código que Docker não resolve.

Referências: Bossini, itens 4.3.56–4.3.61, pp. 77–87 (PDF 81–91); quadros 1–4 deste material. Não há prazo de entrega ou peso de avaliação instituído por este arquivo.
