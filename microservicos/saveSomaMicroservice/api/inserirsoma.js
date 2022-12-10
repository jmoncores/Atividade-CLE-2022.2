const express = require("express");
const { BigQuery } = require('@google-cloud/bigquery');
const instancia = new BigQuery();

var inserirsoma ={
    inserir: async function inserirsoma(body){
        const nomearquivo = body['nome_do_arquivo'];
        const bucket = body['bucket'];
        const timestamp = body['datahora_criacao'];
        const linha = {
            'bucket': bucket,
            'nome_do_arquivo': nomearquivo,
            'datahora_criacao': timestamp
        }
    
        const tabela = instancia.dataset('operacoes').table('tabelaoperacoes');
        await tabela.insert(linha);
    }
};

module.exports = inserirsoma;