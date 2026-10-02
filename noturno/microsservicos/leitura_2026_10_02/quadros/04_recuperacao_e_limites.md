# Quadro 4 — Recuperação do histórico não é garantia completa

**Cenários hipotéticos fundamentados nas linhas do código.**

## Caso A — Só a consulta perdeu a memória

O barramento permaneceu ativo e contém, em ordem: `LembreteCriado`, `ObservacaoCriada`, `ObservacaoClassificada` e `ObservacaoAtualizada`. Não chegam eventos ao vivo durante a reconstrução.

Nas linhas 44–45 de `05_consulta.js`, a consulta obtém o histórico. Nas linhas 47–51, aplica os handlers em ordem. Ela ignora o tipo `ObservacaoClassificada`, que não está no mapa, e usa `ObservacaoAtualizada` para a representação final.

**Resultado esperado:** a consulta reconstrói o estado do Quadro 3. O histórico ainda existe porque o barramento não reiniciou.

## Caso B — Consulta e barramento perderam a memória

O vetor `eventos` do barramento recomeça vazio. Buscar esse histórico vazio não recupera os acontecimentos antigos. A consulta não usa esse código para buscar diretamente as bases dos produtores.

**Resultado esperado:** não há reconstrução dos dados antigos por esse mecanismo.

## Caso C — O mesmo evento de criação de observação chega duas vezes

O lembrete já está na consulta. O mesmo `ObservacaoCriada` é entregue duas vezes, sem um novo `LembreteCriado` entre elas. O handler executa `push` nas duas chamadas.

**Resultado esperado:** aparecem duas entradas da mesma observação. Este arquivo não usa conjunto de ids processados nem controle de versão.

## Limite adicional

Se `ObservacaoCriada` chegar antes do lembrete, o acesso a `baseConsulta[id]["observacoes"]` falha antes que `|| []` possa ajudar. O `catch` vazio não guarda o evento para tentar depois. Na inicialização, a rota já pode aceitar eventos enquanto a busca do histórico acontece; não há proteção de prontidão nesta versão.

**Conclusão:** os mecanismos adicionais da pasta `aula06_eventos` não podem ser atribuídos automaticamente a este `05_consulta.js`.
