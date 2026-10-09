# Quadro 3 — Host, contêiner e localhost

**Natureza:** cenário esperado sob rede padrão com contêineres separados, sem modo host e sem compartilhamento de namespace de rede.

## Cliente no computador host
```text
host:8080  →  contêiner Hello:5200  →  GET /hey-docker
```

O mapeamento publica uma entrada no host. A porta usada no código do Hello continua sendo 5200.

## Chamada feita por lembretes dentro de um contêiner
O original usa, na linha 41 de `lembretes/06_inclusao_notificando_barramento.js`:

```text
http://localhost:10000/eventos
```

Nesse processo, `localhost` refere-se ao próprio ambiente de rede do contêiner de lembretes. Não é automaticamente o barramento em outro contêiner. Sem um serviço ouvindo ali na porta 10000, essa conexão não chega ao barramento.

## Chamada feita pelo barramento
As linhas 15–18 de `barramento-de-eventos/index.js` apontam para `localhost:4000`, `localhost:5000`, `localhost:6000` e `localhost:7000`. Em um contêiner separado, esses endereços também apontam para ele próprio.

## Caminhos a planejar em outra etapa
A nota da apostila, p. 82, menciona usar o IP do host. Uma alternativa de Docker é uma rede apropriada com nomes para os serviços; Compose pode ajudar a descrever isso. Nenhuma dessas configurações foi aplicada ao código deste pacote.

**Conclusão:** imagens prontas e portas publicadas não provam comunicação entre microsserviços. O endereço de saída usado pela aplicação também precisa estar correto.
