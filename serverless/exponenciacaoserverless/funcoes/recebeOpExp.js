const pubsub = require('./pubsub')

module.exports = async function recebeOpExp(requisicao, resposta){
    const operandos = requisicao.body
    if (operandos.hasOwnProperty('operando_1') === false){
        resposta.send('Campo operando_1 não informado')
        return
    }

    if (operandos.hasOwnProperty('operando_2') === false){
        resposta.send('Campo operando_2 não informado')
        return
    }

    const resultado = await pubsub(operandos, 'exponenciacao')
    console.log(operandos)
    resposta.send(`Dados da operação de exponenciação (${operandos.operando_1} ** ${operandos.operando_2}) enviados com sucesso`)
    //resposta.send(resultado)
}