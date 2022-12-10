const { Storage } = require('@google-cloud/storage')
const instanciaStorage = new Storage()
const instanciaBucket = instanciaStorage.bucket('opdivisao');


module.exports = async function divide(evento){
    try{
        const operandosCodificados = evento.data
        const json = Buffer.from(operandosCodificados, 'base64').toString()
        const operandos = JSON.parse(json)
        const operando1 = operandos['operando_1']
        const operando2 = operandos['operando_2']
        const resultado = {
            'nome': 'divisão',
            'operando_1': operando1,
            'operando_2': operando2,
            'resultado': operando1 / operando2
        }

        const timestamp = new Date().getTime()
        const fileName = `divisao_${timestamp}.json`
        const file = instanciaBucket.file(fileName)
        const contents = JSON.stringify(resultado)
        const success = await file.save(contents)

        console.log(resultado)
    } catch(erro){
        console.error(erro)
        console.log(JSON.stringify(erro.response))
    }
}