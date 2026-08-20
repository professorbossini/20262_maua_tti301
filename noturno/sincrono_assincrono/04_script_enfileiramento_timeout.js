setTimeout(function () {
    console.log("Dentro do timeout", 0);
});

const a = new Date().getTime() + 1000;

while (new Date().getTime() < a);

console.log("Fora do timeout");

