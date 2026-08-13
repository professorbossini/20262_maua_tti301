function demorada() {
    const atualMais2Segundos = new Date().getTime() + 2000;
    while(new Date().getTime() < atualMais2Segundos);
    const d = 8 + 4;
    return d;
}

const a = 2 + 3;
const b = 5 + 9;
const d = demorada();

const e = 2 + a +b;
console.log(e);