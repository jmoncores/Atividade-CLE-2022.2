const pubsub = require('./pubsub')

module.exports = async function recebeOpDiv(requisicao, resposta){
    const operandos = requisicao.body
    if (operandos.hasOwnProperty('operando_1') === false){
        resposta.send('Campo operando_1 não informado')
        return
    }

    if (operandos.hasOwnProperty('operando_2') === false){
        resposta.send('Campo operando_2 não informado')
        return
    }
    if (operandos.operando_2 === 0){
        resposta.send('Campo operando_2 não pode ser zero para esta operação')
        return
    }

    const resultado = await pubsub(operandos, 'divisao')
    console.log(operandos)
    resposta.send(`Dados da operação de divisão (${operandos.operando_1} / ${operandos.operando_2}) enviados com sucesso`)
    //resposta.send(resultado)
}