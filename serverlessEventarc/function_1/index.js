const functions = require('@google-cloud/functions-framework');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();


function insertHandler(err, apiResponse) {
  if (err) {
    console.error(err);
  }
}

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
functions.cloudEvent('insertOp', cloudEvent => {
 console.log(`Event ID: ${cloudEvent.id}`);
 console.log(`Event Type: ${cloudEvent.type}`);

 const file = cloudEvent.data;

 //const linha = {'bucket': file.name,'nome_do_arquivo': file.name,'datahora_criacao': file.timeCreated};
 console.log('Criação da linha');
 const dataset = bigquery.dataset('operacoes');
 const optable = dataset.table('tabelaoperacoes');
 optable.insert({
  bucket: file.bucket,
  nome_do_arquivo: file.name,
  datahora_criacao: file.timeCreated
}, insertHandler);

 //instancia.dataset('operacoes').table('tabelaoperacoes').insert(linha);

 console.log(`Inserção de ${file.name} realizada com sucesso`);
 //console.log(`Bucket: ${file.bucket}`);
 //console.log(`File: ${file.name}`);
 //console.log(`Metageneration: ${file.metageneration}`);
 //.log(`Created: ${file.timeCreated}`);
 //console.log(`Updated: ${file.updated}`);
});


