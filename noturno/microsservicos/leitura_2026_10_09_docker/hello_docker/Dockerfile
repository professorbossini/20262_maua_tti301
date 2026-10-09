# TTI301 — 09/10/2026 — Hello Docker; proposta didática.
# Bossini: seção 4.3.56, Bloco 4.3.35, p. 79 (PDF 83).
# Adaptação explícita: node:14 -> node:24-alpine.
# EXPOSE documenta a porta; não publica uma porta do host.

FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5200
CMD ["node", "index.js"]
