const { Storage } = require('@google-cloud/storage')
const instanciaStorage = new Storage()
const instanciaBucket = instanciaStorage.bucket('opmultiplicacao');


module.exports = async function multiplica(evento){
    try{
        const operandosCodificados = evento.data
        const json = Buffer.from(operandosCodificados, 'base64').toString()
        const operandos = JSON.parse(json)
        const operando1 = operandos['operando_1']
        const operando2 = operandos['operando_2']
        //const operacaoMultiplicacao = operando1 * operando2
        const resultado = {
            'nome': 'multiplicacao',
            'operando_1': operando1,
            'operando_2': operando2,
            'resultado': operando1 * operando2
        }

        const timestamp = new Date().getTime()
        const fileName = `multiplicacao_${timestamp}.json`
        const file = instanciaBucket.file(fileName)
        const contents = JSON.stringify(resultado)
        const success = await file.save(contents)

        console.log(resultado)
    } catch(erro){
        console.error(erro)
        console.log(JSON.stringify(erro.response))
    }
}