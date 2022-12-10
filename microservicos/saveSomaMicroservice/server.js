var express = require('express');
var inserirsoma = require('./api/inserirsoma');
const {IAMCredentialsClient} = require('@google-cloud/iam-credentials');


var app = express();

app.use(express.json());

app.post('/', function(request, response){
  console.log(request.body);
  inserirsoma.inserir(request.body);
  response.send("Operação inserida. Aguardando a próxima requisição.");
});

app.listen(3000, () => {
  console.log('Server running on 3000');
})