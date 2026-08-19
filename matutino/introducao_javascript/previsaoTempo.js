const axios = require('axios');

const appid = "sua_chave_de_api_aqui"; // Substitua pela sua chave de API do OpenWeatherMap

const q = "Itu";

const units = 'metric';

const lang = 'pt_BR';

const cnt = "10";

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${appid}&units=${units}&lang=${lang}&cnt=${cnt}`;

axios
    .get(url)
    .then((res) => {
        console.log(res);
        return res.data;
    })
    .then((res) => {
        console.log(res.cnt);
        return res;
    })
    .then((res) => {
        console.log('Recebendo os valores do campo cnt');
        return res['list'];
    })
    .then((res) => {
        for (let previsao of res) {
            console.log(`
                ${new Date(previsao.dt * 1000).toLocaleString()},
                ${'Min: ' + previsao.main.temp_min}\u00B0C,
                ${'Max: ' + previsao.main.temp_max}\u00B0C,
                ${'Hum: ' + previsao.main.humidity} %,
                ${'Desc: ' + previsao.weather[0].description} 
            `);
        }
        return res;
    })
    .then((res) => {
        const listaAcima30 = res.filter(r => r.main.feels_like > 30);
        console.log(`${listaAcima30.length} dias com sensação térmica acima de 30\u00B0C`);
    });

