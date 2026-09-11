// Ensaio automático de integração. Usa Express e Axios reais instalados pelo npm ci.
// Abre somente portas livres locais; encerra apenas os processos criados por este teste.
const { spawn } = require("node:child_process");
const net = require("node:net");
const path = require("node:path");
const assert = require("node:assert/strict");
const raiz = path.resolve(__dirname, "..");
const processos = new Map();
const logs = [];
let verificacoes = 0;
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function portaLivre() {
    return await new Promise((resolve, reject) => {
        const s=net.createServer();s.on("error",reject);
        s.listen(0,"127.0.0.1",()=> { const p=s.address().port;s.close(()=>resolve(p)); });
    });
}
async function chamar(base, rota, metodo="GET", corpo) {
    const opcoes={ method: metodo, signal: AbortSignal.timeout(6000) };
    if(corpo!==undefined) {
        opcoes.headers={"Content-Type":"application/json"};opcoes.body=JSON.stringify(corpo);
    }
    const r=await fetch(base+rota,opcoes);
    return { status:r.status, dados:await r.json() };
}
function ok(condicao,mensagem) {
    assert.ok(condicao,mensagem);verificacoes++;console.log(`OK ${verificacoes}: ${mensagem}`);
}
async function aguardar(condicao) {
    for(let i=0;i<100;i++) {
        try { if(await condicao()) return; } catch(erro) {}
        await esperar(80);
    }
    throw new Error("Tempo esgotado esperando a condição do ensaio.");
}
async function parar(nome) {
    const p=processos.get(nome);if(!p) return;
    if(p.exitCode===null && p.signalCode===null) {
        const terminou=new Promise((resolve)=>p.once("exit",resolve));p.kill("SIGTERM");await terminou;
    }
    processos.delete(nome);
}
async function iniciar(nome,arquivo,env,base) {
    const p=spawn(process.execPath,[arquivo],{cwd:raiz,env:{...process.env,...env},stdio:["ignore","pipe","pipe"]});
    processos.set(nome,p);
    p.stdout.on("data",(d)=>logs.push(`${nome}: ${d}`));p.stderr.on("data",(d)=>logs.push(`${nome}: ${d}`));
    await aguardar(async()=> (await chamar(base,"/saude")).status===200);
}
(async()=>{
    require.resolve("express");require.resolve("axios");
    const portas={};
    for(const nome of ["L","O","Q","K","B"]) {
        let porta;
        do { porta=await portaLivre(); } while(Object.values(portas).includes(porta));
        portas[nome]=porta;
    }
    const bases={};const env={ATRASO_MS:"20"};
    for(const [nome,porta] of Object.entries(portas)) {
        bases[nome]=`http://127.0.0.1:${porta}`;env[`PORTA_${nome}`]=String(porta);env[`BASE_${nome}`]=bases[nome];
    }
    const ocioso=async()=>{const r=await chamar(bases.B,"/estado");return r.dados.pendentes===0&&!r.dados.distribuindo;};
    const l=async(texto)=>await chamar(bases.L,"/lembretes","POST",{texto});
    const o=async(texto,id=1)=>await chamar(bases.O,`/lembretes/${id}/observacoes`,"POST",{texto});
    await iniciar("L","14_lembretes_emite_eventos.js",env,bases.L);
    await iniciar("O","15_observacoes_emite_eventos.js",env,bases.O);
    await iniciar("Q","16_consulta_por_eventos.js",env,bases.Q);
    await iniciar("B","13_barramento_tres_destinos.js",env,bases.B);
    ok((await l("Estudar")).status===201,"lembrete criado e publicação confirmada");
    ok((await o("observacao inicial")).status===201,"observação criada e publicada");
    await aguardar(ocioso);
    let q=await chamar(bases.Q,"/lembretes");
    ok(q.dados[1].observacoes.length===1,"consulta básica combina duas bases");
    ok((await l(" ")).status===400,"texto vazio rejeitado");
    ok((await chamar(bases.B,"/eventos","POST",{})).status===400,"envelope inválido rejeitado");
    const h=(await chamar(bases.B,"/eventos")).dados;
    ok(h.length===2,"histórico contém exatamente dois eventos");
    ok((await chamar(bases.B,"/eventos","POST",h[0])).dados.repetido,"barramento reconhece duplicata");
    ok((await chamar(bases.B,"/eventos","POST",{...h[0],dados:{...h[0].dados,texto:"outro"}})).status===409,"id reutilizado com outro conteúdo gera conflito");
    await chamar(bases.Q,"/eventos","POST",h[1]);
    q=await chamar(bases.Q,"/lembretes");
    ok(q.dados[1].observacoes.length===2,"versão básica demonstra duplicação (limitação intencional)");
    await parar("B");await parar("Q");await parar("O");await parar("L");
    // Etapa 2: reinício integral, agora com classificação.
    await iniciar("L","14_lembretes_emite_eventos.js",env,bases.L);
    await iniciar("O","18_observacoes_atualiza_status.js",env,bases.O);
    await iniciar("Q","16_consulta_por_eventos.js",env,bases.Q);
    await iniciar("K","17_classificacao.js",env,bases.K);
    await iniciar("B","19_barramento_quatro_destinos.js",env,bases.B);
    await l("Classificar");
    const importante=await o("prazo importante");const comum=await o("apenas uma nota");
    await aguardar(ocioso);
    q=await chamar(bases.Q,"/lembretes");
    ok(q.dados[1].observacoes.find(x=>x.id===importante.dados.id).status==="importante","classificação importante chega à consulta");
    ok(q.dados[1].observacoes.find(x=>x.id===comum.dados.id).status==="comum","classificação comum chega à consulta");
    let direto=await chamar(bases.O,"/lembretes/1/observacoes");
    ok(direto.dados.every(x=>x.versao===2),"proprietário mantém versão 2 após classificação");
    await parar("Q");
    ok((await l("Criado com consulta desligada")).status===201,"produtor funciona com consulta desligada");
    await aguardar(ocioso);
    await iniciar("Q","16_consulta_por_eventos.js",env,bases.Q);
    ok(Object.keys((await chamar(bases.Q,"/lembretes")).dados).length===0,"consulta básica reinicia vazia");
    await parar("Q");await iniciar("Q","21_consulta_com_replay.js",env,bases.Q);
    await aguardar(async()=> (await chamar(bases.Q,"/saude")).dados.pronta);
    q=await chamar(bases.Q,"/lembretes");
    ok(Object.keys(q.dados).length===2,"replay reconstrói os dois lembretes");
    ok(q.dados[1].observacoes.length===2,"replay mantém duas observações sem duplicar");
    const antes=JSON.stringify(q.dados);
    ok((await chamar(bases.Q,"/reprocessar","POST")).status===200,"replay manual disponível");
    ok(JSON.stringify((await chamar(bases.Q,"/lembretes")).dados)===antes,"segundo replay não muda a projeção");
    const hist=(await chamar(bases.B,"/eventos")).dados;
    const evtObs=hist.find(x=>x.tipo==="ObservacaoCriada");
    ok((await chamar(bases.Q,"/eventos","POST",evtObs)).dados.resultado==="repetido","duplicata direta é reconhecida pela consulta robusta");
    ok((await chamar(bases.Q,"/eventos","POST",{id:"neutro",tipo:"EventoDesconhecido",dados:{}})).dados.resultado==="ignorado","evento sem handler é ignorado explicitamente");
    // Falha parcial: armazenamento local ocorre antes da publicação.
    await aguardar(ocioso);await parar("B");
    const parcial=await l("Registro durante falha do barramento");
    ok(parcial.status===503&&parcial.dados.lembrete.id===3,"503 explicita armazenamento local com publicação não confirmada");
    ok((await chamar(bases.L,"/lembretes/3")).status===200,"503 não desfez a gravação local");
    await parar("Q");await iniciar("Q","21_consulta_com_replay.js",env,bases.Q);
    ok((await chamar(bases.Q,"/lembretes")).status===503,"consulta sem replay inicial não finge estar pronta");
    await iniciar("B","19_barramento_quatro_destinos.js",env,bases.B);
    ok((await chamar(bases.B,"/eventos")).dados.length===0,"reinício do barramento perde histórico volátil");
    console.log(`ENSAIO CONCLUÍDO: ${verificacoes} verificações HTTP.`);
})().catch((erro)=>{
    console.error("ENSAIO FALHOU:",erro.message);
    console.error(logs.slice(-25).join("\n"));process.exitCode=1;
}).finally(async()=>{
    for(const nome of [...processos.keys()]) await parar(nome);
});
