# Atividade de leitura — TTI301 · 02/10/2026

Use apenas os scripts desta pasta. Não é necessário instalar pacotes, iniciar serviços ou enviar requisições. Em cada resposta, cite o arquivo e a linha ou intervalo que sustenta sua conclusão. Esta é uma atividade de consolidação; não há nova regra de nota ou prazo neste material.

## 1. Quatro destinos

Em `02_barramento.js`, as linhas 15–18 iniciam quatro envios e a linha 20 responde `200`. Esse `200` comprova que a consulta já atualizou sua base? Explique o que falta no código para permitir essa conclusão.

## 2. Duas versões do classificador

O evento tem `tipo: "ObservacaoCriada"` e `dados.texto: "Revisão importante"`. Compare `04_classificacao_original.js` com `04b_classificacao_importacao_proposta.js`: em qual linha o original interrompe o handler e o que a proposta permite fazer? Considere a biblioteca disponível para a versão proposta. Explique também por que um `200` ainda não é garantia de entrega completa.

## 3. Objeto e posição

Compare `find` em `03_observacoes.js` com `findIndex` em `05_consulta.js`. O que cada um devolve? Qual objeto ou posição é atualizado? Considere que a observação procurada existe nas duas bases.

## 4. Histórico e repetição

O lembrete já existe na consulta e o mesmo `ObservacaoCriada` chega duas vezes, sem outro evento entre as entregas. Quantas entradas são inseridas por esse handler? Depois, explique por que reiniciar também o barramento pode impedir a recuperação de acontecimentos antigos.
