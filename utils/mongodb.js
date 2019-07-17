const MongoClient = require('mongodb').MongoClient;

// Variaveis connection e db globais, recebem a instancia da conexao ao DB e o nome do banco ao qual estamos conectados, respectivamente
let connection;
let db;
// url da nova conexao
const url = "mongodb://localhost:27017/";

async function initialize(){
    // instancia de uma conexao ao mongoDB na interface localhost
    connection = await MongoClient.connect(url, { useNewUrlParser: true }
    );

    console.log('connected.\n\n\n');
    db = connection.db('All');
}

// Insere um usuario na colecao
async function insertUser(user){
    return await db.collection("usuarios").insertOne(user);
}

// Retorna todos os usuarios cadastrados na colecao em um Array --removendo os campos login e password
async function recoverAll(){
    return await db.collection("usuarios").find({}).project({login: 0, password: 0}).toArray();
}

// Retorna um usuario especifico dado uma query de busca (id)
async function recoverUser(userQuery){
    return await db.collection("usuarios").findOne(userQuery);
}

// Remove um usuario da colecao, dada uma query especifica (id)
async function deleteUser(userQuery){
    return await db.collection("usuarios").deleteOne(userQuery);
}

// Atualiza o conteudo de um usuario, encontrado atraves do id (informacao nova esta em userBody)
async function updateUser(id, userBody){
    return await db.collection("usuarios").updateOne({ _id: id }, { $set: userBody });
}

// exportacao dos metodos
module.exports = {
    initialize,
    insertUser,
    recoverAll,
    recoverUser,
    deleteUser,
    updateUser
};