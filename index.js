var axios = require('axios')
var cron = require('node-cron');

const main = async () => {
    try {

        const dadosTse = await axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json').catch((error) => {
            throw new Error(e.message)
        })
        const resultado = []


        for (const candidato of dadosTse.data.cand) {
            resultado.push({
                candidato: candidato.nm,
                votos: candidato.vap,
                porcentagem: candidato.pvap
            })
        }
        console.log({
            Data: dadosTse.data.dg,
            Horario: dadosTse.data.hg,
            Apuradas: dadosTse.data.psi
        })
        console.table(resultado)

    }
    catch (exception) {
        console.error({ exception })
    }
}



cron.schedule('* * * * *', () => {
    main()
});




