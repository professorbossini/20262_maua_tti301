# TTI301 — Integração do fluxo de eventos
## 02 de outubro de 2026 · Turma online · Material de leitura · v1.0

Pergunta central: **por que uma observação pode continuar como `aguardando`, mesmo quando uma rota responde `200`?**

Este conjunto apresenta cinco arquivos da implementação do noturno no snapshot `2962233`, em cópias de leitura com a numeração original preservada. As explicações distinguem o estado do código recebido de uma proposta pontual de importação. Não é uma nova aplicação nem substitui os projetos originais e seus arquivos de dependências.

### Percurso

1. `00_MAPA.md`: responsabilidades, portas e eventos.
2. `scripts/01_lembretes.js` e `scripts/02_barramento.js`: gravação, publicação e distribuição.
3. `quadros/01_lembrete_e_barramento.md`: comparar o recurso local com o evento e com a consulta.
4. `scripts/03_observacoes.js`: criação de uma observação; o tratamento da classificação será retomado depois.
5. `scripts/04_classificacao_original.js`: regra de classificação e comportamento do snapshot.
6. `quadros/02_resultado_do_snapshot.md`: cenário sem a importação de axios.
7. `scripts/04b_classificacao_importacao_proposta.js`: proposta explícita de uma importação, sem outras alterações executáveis.
8. `scripts/03_observacoes.js` e `scripts/05_consulta.js`: atualização no proprietário e na consulta.
9. `quadros/03_fluxo_com_importacao.md`: resultado esperado sob premissas declaradas.
10. `quadros/04_recuperacao_e_limites.md`: leitura do histórico e limites do exemplo.
11. `ATIVIDADE_LEITURA.md`: quatro questões para consolidação.

### Como interpretar os quadros

Os quadros são **resultados esperados por análise do código**, não capturas de serviços em execução. Cada cenário informa suas premissas. `O1` é um identificador fictício usado no lugar de um UUID real.

O classificador original chama `axios.post` sem importar axios. Portanto, não se apresenta o fluxo de classificação completo como resultado daquele arquivo. A versão `04b` documenta uma proposta de importação apoiada na própria apostila; ela não equivale a uma revisão completa de robustez da aplicação.

### Relação com o material anterior

A pasta `aula06_eventos` contém outra implementação, com contrato comum e mecanismos adicionais. Aqui lemos os projetos simples das pastas `lembretes`, `barramento-de-eventos`, `observacoes`, `classificacao` e `consulta`. Não misture os contratos: neste código o evento `LembreteCriado` usa `dados.contador`, e não há id do evento ou número de versão no envelope.

### Código completo e origem

Todos os arquivos de leitura estão completos. Os comentários de referência foram acrescentados **depois** do código original, para não deslocar seus números de linha. `ORIGEM.json` registra caminhos, linhas e hashes; `REFERENCIAS.md` localiza os trechos das apostilas. A pasta `scripts` é uma coleção didática de leituras, não um projeto instalado.
