# Aula 4 - Da API consumida ao primeiro microsserviço

## Onde estamos nas apostilas

- Bossini, `01_apostila_microsservicos.pdf`, capítulo 4:
  - arquitetura monolítica: aprox. pp. 9-10;
  - arquitetura baseada em microsserviços: aprox. pp. 10-16;
  - aplicação e serviço de lembretes: aprox. pp. 16-24.
- Bossini, `http_apostila.pdf`:
  - códigos de status: aprox. p. 8;
  - métodos HTTP: aprox. pp. 9-12.

## A ponte com OpenWeatherMap

Na aula anterior, nosso código era cliente:

```text
nosso script -> requisição HTTP -> OpenWeatherMap
nosso script <- resposta HTTP  <- OpenWeatherMap
```

Nesta aula, construiremos o outro lado:

```text
curl ou Thunder -> requisição HTTP -> nosso serviço Express
curl ou Thunder <- resposta HTTP  <- nosso serviço Express
```

## Monólito e microsserviços

### Aplicação monolítica

- várias funcionalidades são implantadas como uma unidade;
- uma alteração pode exigir nova implantação do conjunto;
- monolítico não significa necessariamente código desorganizado.

### Arquitetura baseada em microsserviços

- serviços pequenos e independentes;
- cada serviço possui uma responsabilidade principal;
- cada serviço expõe uma interface bem definida;
- idealmente, cada serviço controla seus próprios dados;
- a independência cria a necessidade de comunicação entre processos.

## Nosso primeiro serviço

```text
serviço: lembretes
porta: 4000
responsabilidade: criar, listar e consultar lembretes
```

A base inicial será um objeto JavaScript na memória. Quando o processo termina, os dados desaparecem. Isso é intencional: primeiro isolamos HTTP, rotas, status e estado; persistência virá depois.
