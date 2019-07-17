const express = require('express');
const app = express();

const mongo = require('./utils/mongodb');

const bcrypt = require('bcrypt');
const saltRounds = 10;

mongo.initialize();

//numero minimo de characteres que um nome deve conter
const minChar = 4;

//adicionando um middleware para permitir o uso de json nos requests
app.use(express.json());


// Pedido para acessar a lista completa de usuarios cadastrados
app.get('/api/usuarios', async function(req, res) {
	try {
		console.log("Buscando todos os usuarios\n");
		let user = await mongo.recoverAll();

		//Caso nao existam usuarios cadastrados, uma simples mensagem de erro eh mostrada
		if (user.length === 0) {
			res.status(404).send('Nao existem usuarios cadastrados');
		}
		//senao, a lista dos usuarios cadastrados atualmente eh enviada como resposta
		else{
			res.send(user);
		}
		
	}

	catch(err){

	}
});


// Metodo para encontrar o usuario com id especifico
app.get('/api/usuarios/:id', async function (req, res) {
	try{
		let userQuery = { _id: req.params.id };
		let usuario = await mongo.recoverUser(userQuery);
		delete usuario.login;
		delete usuario.password;

		if (!usuario) {
			res.status(404).send('O usuario com o id requisitado nao foi encontrado.');
			return;
		}

		//Caso contrario, o usuario eh retornado
		res.send(usuario);
	}

	catch{

	}
	
	
});


// Metodo para adicionar um usuario no cadastro
app.post('/api/usuarios', async function (req, res) {
	try{
		//Atribuicao dos valores de nome e idade as variaveis correspondentes
		let cpfUsuario = req.body._id;
		let nomeUsuario = req.body.nome;
		let idadeUsuario = req.body.idade;
		let loginUsuario = req.body.login;
		let passwordUsuario = req.body.password;

		bcrypt.hash(passwordUsuario, saltRounds, async function(err, hash){
			passwordUsuario = hash;
			//Um novo objeto do tipo usuario eh criada com os valores que se deseja inserir.
			let usuario = {
				_id: cpfUsuario,
				nome: nomeUsuario,
				idade: idadeUsuario,
				login: loginUsuario,
				password: passwordUsuario
			};

			await mongo.insertUser(usuario);

			//Ao criar o novo item, uma resposta eh enviada com o conteudo criado.
			res.send(usuario);
		});
		
		//Caso o nome nao tenha sido fornecido, uma mensagem de erro eh reportada e a insercao cancelada.
		if (!nomeUsuario) {
			res.status(400).send('Necessario fornecer um nome.');
			return;
		}
		//Caso o nome nao seja maior que um numero especifico de caracteres, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (nomeUsuario.length < minChar) {
			res.status(400).send('O nome fornecido deve possuir mais de 4 caracteres.');
			return;
		}
		//Caso a idade do usuario nao seja fornecida, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (!idadeUsuario) {
			res.status(400).send('Necessario fornecer a idade do usuario.');
			return;
		}
		//Caso a idade de um usuario seja negativa, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (idadeUsuario < 0) {
			res.status(400).send('A idade de um usuario nao pode ser negativa.');
			return;
		}

	}

	catch{

	}
	
});


//Metodo para atualizar os dados de um usuario
app.put('/api/usuarios/:id', async function (req, res) {
	try{
		let id = req.params.id;
		let userBody = req.body;
		delete userBody._id;
		delete userBody.password;

		//apenas para verificacao
		let nomeUsuario = req.body.nome;
		let idadeUsuario = req.body.idade;

		//A seguir, a mesma validacao dos dados realizada na insercao eh feita para a atualizacao

		//Caso o nome nao tenha sido fornecido, uma mensagem de erro eh reportada e a atualizacao cancelada.
		if (!nomeUsuario) {
			res.status(400).send('Necessario fornecer um nome.');
			return;
		}
		//Caso o nome nao seja maior que um numero especifico de caracteres, uma mensagem de erro eh reportada e a atualizacao cancelada.
		else if (nomeUsuario.length < minChar) {
			res.status(400).send('O nome fornecido deve possuir mais de 4 caracteres.');
			return;
		}
		//Caso a idade do usuario nao seja fornecida, uma mensagem de erro eh reportada e a atualizacao cancelada.
		else if (!idadeUsuario) {
			res.status(400).send('Necessario fornecer a idade do usuario.');
			return;
		}
		//Caso a idade de um usuario seja negativa, uma mensagem de erro eh reportada e a atualizacao cancelada.
		else if (idadeUsuario < 0) {
			res.status(400).send('A idade de um usuario nao pode ser negativa.');
			return;
		}

		await mongo.updateUser(id, userBody);

		//Retorno do conteudo atualizado
		res.send(userBody);
	}
	
	catch{

	}
	
});


app.delete('/api/usuarios/:id', async function (req, res) {
	try{
		let userQuery = { _id: req.params.id };
		let usuario = await mongo.deleteUser(userQuery);

		//Retorno do conteudo removido
		res.send(usuario);
	}

	catch{

	}
});


// 'port' ira receber a PORT de algum ambiente de processos existente, ou 1234.
const port = 1234;
//const port = process.env.PORT || 1234;

//Diz no console em qual porta esta conectado
app.listen(port, function () {
	console.log(`Listening on port ${port}...`);
});