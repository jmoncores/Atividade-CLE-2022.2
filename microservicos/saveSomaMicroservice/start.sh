#!/bin/bash

gcloud config set project operacoesserverless
gcloud auth activate-service-account --key-file=autenticacao.json
node server.js
