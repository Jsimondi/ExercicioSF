const express = require('express');
const route = require('./routes/routes.js');
const app = express();

const mongo = require('./utils/mongodb');
const bcrypt = require('bcrypt');

mongo.initialize();


// adicionando um middleware para permitir o uso de json nos requests
app.use(express.json());
// permite utilizar as rotas criadas em 'routes.js'
app.use('/', route);

// 'port' ira receber a PORT de algum ambiente de processos existente, ou 1234.
const port = 1234;
// const port = process.env.PORT || 1234;

// Diz no console em qual porta esta conectado
app.listen(port, function () {
	console.log(`Conectando a porta ${port}...`);
});