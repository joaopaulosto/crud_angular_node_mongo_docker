const express = require('express');
const bodyParser = require('body-parser');

//criar uma aplicação express
const app = express();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//convertendo requisições do tipo Content-Type -- application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//convertendo as requisições para content-type - application/json
app.use(bodyParser.json());

//Configurando a base de dados
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Conectando a base de dados MongoDB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Base de Dados conectada com sucesso");
}).catch(err => {
    console.log('Não foi possível conectar a base de dados. Saindo do APP', err);
    //process.exit();
});

//definindo uma simples rota
app.get('/api', (req, res) => {
    res.json({"message": "Bem bindo a Aplicação EasyNote"});
});

require('./app/routes/owner.routes.js')(app);

//Escuta das requisições
app.listen(3000, ()=> {
    console.log("Servidor rodando na porta 3000");
});
