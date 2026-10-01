# Do barramento inicial ao sistema de consulta

## Etapa 1

```text
Cliente -> Lembretes (4000) -> LembreteCriado ---+
                                              |
Cliente -> Observacoes (5000) -> ObservacaoCriada -> Barramento (10000)
                                                       |
                            +--------------------------+----------------+
                            |                          |                |
                       Lembretes                  Observacoes       Consulta (6000)
                    recebe e ignora            recebe e ignora     atualiza sua copia
                                                                        |
                                                                  Cliente consulta
```

A consulta é uma projeção: armazena uma representação voltada à leitura, montada a partir de fatos publicados. Consultar essa cópia não exige consultar o proprietário de cada registro naquele instante.

## Etapa 2

```text
ObservacaoCriada (aguardando, versao 1)
       |
       v
Classificacao (7000) -> ObservacaoClassificada (importante ou comum)
       |
       v
Observacoes (5000) -> atualiza a base propria -> ObservacaoAtualizada (versao 2)
       |
       v
Consulta (6000) -> aplica a representacao atualizada
```

Todas essas mensagens passam pelo barramento. O classificador não escreve na base de observações nem na base de consulta. A consulta não contém a regra de classificação. A regra didática da apostila é `texto.includes("importante")`, com diferença entre letras maiúsculas e minúsculas.

## Etapa 3

```text
Consulta para -> eventos continuam chegando ao barramento
Consulta reinicia -> busca GET /eventos -> aplica o historico
Repeticao -> identifica evento ja aplicado -> nao duplica
Evento antigo -> compara versao -> nao regride o estado
```

Um evento desconhecido pode ser recebido sem ser aplicado. Ignorar um tipo sem handler não é o mesmo que esconder qualquer exceção. Erros reais de contrato ou de aplicação devem continuar visíveis.
