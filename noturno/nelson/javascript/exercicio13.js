// Declaração de um objeto JSON estruturado
let paciente = {
  nome: "Carlos Silva",
  idade: 45,
  sintomas: ["Febre", "Tosse", "Cansaço"]
};

// Acesso à propriedade 'nome' utilizando a notação de ponto (.)
console.log("Paciente: " + paciente.nome);

// Acesso ao vetor e seus elementos utilizando a notação de colchetes ([])
console.log("Primeiro sintoma: " + paciente["sintomas"][0]);
