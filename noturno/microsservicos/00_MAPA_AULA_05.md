# Aula 5 - Segundo microsserviço e comunicação entre serviços

## Onde estamos nas apostilas

- Bossini, `01_apostila_microsservicos.pdf`, capítulo 4:
  - serviço de observações: seções 4.3.16 a 4.3.23, páginas impressas 25-31;
  - problema das `n + 1` requisições: seção 4.3.24, páginas impressas 31-32;
  - comunicação síncrona: seção 4.3.25, páginas impressas 32-33;
  - comunicação assíncrona e barramento: seções 4.3.26 a 4.3.28, páginas impressas 33-38.
- Bossini, `http_apostila.pdf`:
  - cliente e servidor como papéis de software: páginas impressas 2-3;
  - requisição, resposta, métodos e status: páginas impressas 4-10.

## Ponto de partida

Na aula anterior, um único processo controlava seus próprios lembretes:

```text
serviço de lembretes
porta 4000
responsabilidade: criar, listar e consultar lembretes
estado: objeto JavaScript mantido em memória
```

Agora acrescentamos outra responsabilidade:

```text
serviço de observações
porta 5000
responsabilidade: criar e listar observações de um lembrete
estado próprio: observações agrupadas pelo id do lembrete
```

## Dois processos, duas portas e dois estados

```text
cliente HTTP
    |---> porta 4000 ---> serviço de lembretes ---> base de lembretes
    |
    |---> porta 5000 ---> serviço de observações -> base de observações
```

Os serviços podem executar na mesma máquina e continuar independentes: são processos diferentes, escutam portas diferentes e não compartilham variáveis.

## Primeiro problema: n + 1 requisições

Para montar uma tela com lembretes e observações, um cliente pode fazer:

```text
1 requisição para obter os lembretes
+
n requisições para obter as observações dos n lembretes
```

Com 2 lembretes, são 3 requisições. Com 100 lembretes, são 101.

## Comunicação síncrona

A seção 4.3.25 da apostila propõe esconder essa coordenação do cliente:

```text
cliente
   | 1 GET
   v
serviço de lembretes
   | GET ao serviço de observações e espera a resposta
   v
serviço de observações
```

O cliente recebe uma representação combinada. A implementação fica mais simples para ele, mas surge dependência entre os serviços.

## Próxima evolução

A apostila segue para comunicação assíncrona, redundância controlada de dados e barramento de eventos. O Script 12 é apenas uma primeira ponte: recebe e registra eventos, mas ainda não realiza broadcast.
