# Quadro 1 — O recurso local não é o evento

**Resultado esperado por leitura do código. Não é saída capturada.**

## Premissas

Os serviços necessários estão disponíveis. As memórias começam vazias. O cliente envia `{"texto":"Revisar HTTP"}`. O barramento aceita a publicação e o evento chega à consulta.

## No serviço de lembretes

Depois da gravação nas linhas 32–40 de `01_lembretes.js`:

```json
{"1":{"id":1,"texto":"Revisar HTTP","concluido":false}}
```

Na publicação das linhas 41–47, o corpo enviado é:

```json
{"tipo":"LembreteCriado","dados":{"contador":1,"texto":"Revisar HTTP"}}
```

A resposta `201`, na linha 49, leva o objeto local do lembrete. Ela só é alcançada depois que o `await` da publicação termina com sucesso.

## No barramento

A linha 13 de `02_barramento.js` acrescenta esse evento ao vetor `eventos`. As linhas 15–18 iniciam o envio a quatro destinos. A resposta `200` da linha 20 **não aguarda nem comprova a aplicação nos quatro serviços**.

## Na consulta

Depois que o handler `LembreteCriado` termina, o estado esperado é:

```json
{"1":{"contador":1,"texto":"Revisar HTTP"}}
```

O evento não transporta `concluido`; a consulta não cria esse campo automaticamente. O produtor normaliza o texto do recurso com `trim()`, mas envia a variável `texto` original no evento. Se houver espaços nas bordas da entrada, as representações podem divergir também nesse detalhe.

**Conclusão:** ler o objeto que foi realmente enviado, não presumir que toda a memória do produtor foi copiada.
