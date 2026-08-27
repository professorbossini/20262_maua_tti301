const axios = require('axios');

const appid = "sua_chave_de_API"; // substitua pela sua chave de API do OpenWeatherMap

const q = "Itu"; // q="S%C3%A3o%20Paulo"

const units = 'metric';

const lang = 'pt_BR';

const cnt = "10";

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${appid}&units=${units}&lang=${lang}&cnt=${cnt}`;

// axios
//     .get(url)
//     .then((res) => {
// //        console.log(res.data.list);
//         for (let previsao of res.data.list) {
//             console.log(`
//                 ${new Date(previsao.dt * 1000).toLocaleString()},
//                 ${'Min: ' + previsao.main.temp_min}\u00B0C,
//                 ${'Max: ' + previsao.main.temp_max}\u00B0C,
//                 ${'Hum: ' + previsao.main.humidity} %,
//                 ${'Desc: ' + previsao.weather[0].description}
//             `);
//         }
//     });


axios
    .get(url)
    .then((res) => {
//        console.log(res);
        return res.data;
    })
    .then((item1) => {
        console.log(item1.cnt);
        return item1.list;
    })
    .then((lista) => {
//        console.log(lista);
        for (let previsao of lista) {
            console.log(`
                ${new Date(previsao.dt * 1000).toLocaleString()},
                ${'Min: ' + previsao.main.temp_min}\u00B0C,
                ${'Max: ' + previsao.main.temp_max}\u00B0C,
                ${'Hum: ' + previsao.main.humidity} %,
                ${'Desc: ' + previsao.weather[0].description}
            `);
        }
        return lista;
    })
    .then((lista) => {
        const listaFiltrada = lista.filter((previsao) => previsao.main.feels_like > 22);
        console.log(`${listaFiltrada.length} previsões têm percepção humana de temperatura acima de 22 graus`);
    });
