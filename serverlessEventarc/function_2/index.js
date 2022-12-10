const functions = require('@google-cloud/functions-framework');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();


function insertHandler(err, apiResponse) {
  if (err) {
    console.error(err);
  }
}

functions.cloudEvent('insertOp', cloudEvent => {
 console.log(`Event ID: ${cloudEvent.id}`);
 console.log(`Event Type: ${cloudEvent.type}`);

 const file = cloudEvent.data;

 console.log('Criação da linha');
 const dataset = bigquery.dataset('operacoes');
 const optable = dataset.table('tabelaoperacoes');
 optable.insert({
  bucket: file.bucket,
  nome_do_arquivo: file.name,
  datahora_criacao: file.timeCreated
}, insertHandler);

 console.log(`Inserção de ${file.name} realizada com sucesso`);
});


