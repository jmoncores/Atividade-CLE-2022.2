#!/bin/bash

## Adjust the bucket name accordingly.
BUCKET_NAME=opsoma
##

##gcloud config set project operacoesserverless
gcloud auth activate-service-account --key-file=autenticacaosoma.json
while true
do
   echo "Gerando operandos aleatórios para operação de soma"
   OPERANDO_1=$((RANDOM%100+1))
   OPERANDO_2=$((RANDOM%100+1))
   echo "Operadores: ${OPERANDO_1} e ${OPERANDO_2}"
   SOMA=$((OPERANDO_1 + OPERANDO_2))
   current_time=$(date +"%s")
   JSON_NAME="soma_${current_time}.json"
   JSON_STRING=$( jq -n \
                  --arg nm "soma" \
                  --arg op1 "$OPERANDO_1" \
                  --arg op2 "$OPERANDO_2" \
                  --arg rs "$SOMA" \
                  '{nome: $nm, operando_1: $op1, operando_2: $op2, resultado: $rs}' )
   echo "$JSON_STRING" > "$JSON_NAME"
   echo "Armazenando arquivo JSON no Google Storage"
   gsutil cp $JSON_NAME gs://$BUCKET_NAME
   
   CURL_STRING=$( jq -n \
                  --arg bk "$BUCKET_NAME" \
                  --arg nm "$JSON_NAME" \
                  --arg dh "$current_time" \
                  '{bucket: $bk, nome_do_arquivo: $nm, datahora_criacao: $dh}' )
   curl -X POST http://localhost:3000 -H 'Content-Type: application/json' -d "$CURL_STRING"

   
   echo "Deletando arquivo temporário"
   rm -fr $JSON_NAME

   echo "Espera 2 minutos antes de criar nova operação"
   sleep 120
done
