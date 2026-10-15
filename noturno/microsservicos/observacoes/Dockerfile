# TTI301 — 09/10/2026 — Padrão comum para os cinco serviços.
# Bossini: seções 4.3.58 e 4.3.60, pp. 82–85 (PDF 86–89).
# Proposta: node:24-alpine e npm ci com os lockfiles fornecidos.
# Preserva npm start e o código da base; não corrige a comunicação entre serviços.

FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
