const express = require('express');
const router = express.Router();
const mongo = require('../utils/mongodb');
const bcrypt = require('bcrypt');
const validate = require('../utils/validator.js');
const pwVer = require('../utils/pwverification.js');

// fator de custo para gerar a Bcrypt Hash
const saltRounds = 15;

// Pedido para acessar a lista completa de usuarios cadastrados
router.get('/api/usuarios', async function(req, res) {
	try {
        // Acesso ao metodo "find()" do mongoDB
		console.log("Buscando todos os usuarios\n");
        let user = await mongo.recoverAll();
        
        //delete user.login;
        //delete user.password;

		// Caso nao existam usuarios cadastrados, uma simples mensagem de erro eh mostrada
		if (user.length === 0) {
			throw "Nenhum usuario cadastrado";
		}
		// Caso existam usuarios, a lista dos usuarios cadastrados atualmente eh enviada como resposta
		else{
			res.send(user);
		}
		
	}

	catch(err){
        // tratando o caso de nao existirem usuarios no cadastro
        res.status(404).send('Nao existem usuarios cadastrados');
	}
});


// Metodo para encontrar o usuario com id especifico
router.get('/api/usuarios/:id', async function (req, res) {
	try{
        // Atribuicao das variaveis:
        // userQuery recebe o parametro id passado no request
        let userQuery = { _id: req.params.id };
        // usuario recebe o retorno da funcao findOne do mongoDB
        let usuario = await mongo.recoverUser(userQuery);
        console.log(usuario);
        // remocao dos campos que nao irao ser mostrados
		delete usuario.login;
		delete usuario.password;

        // caso nao exista um usuario com o id requisitado no cadastro
		if (!usuario) {
            throw "Nao encontrado";
        }
        else{
            // Caso contrario, o usuario eh retornado
            res.send(usuario);
        }
	}

	catch(err){
        // tratando o caso de nao existir o id buscado detre os usuarios cadastrados
        res.status(404).send('O usuario com o id requisitado nao foi encontrado.');
	}
});

// Metodo para verificar se a senha de um usuario esta correta
router.post('/api/usuarios/verify/', async function(req, res){
    // Query para busca pelo id
    let userQuery = { _id: req.body._id };
    // Password fornecida para comparacao
    let entryPassword = req.body.password;

    // Retorno da busca pelo id do usuario
    usuario = await mongo.recoverUser(userQuery);

    // Verificador de senhas (bcrypt)
    let result = await pwVer.verifyPassword(entryPassword, usuario.password);
    // Se as senhas forem iguais,retorna o conteudo completo do usuario
    if(result == true){
        res.status(200).send(usuario);
    }
    // Caso contrario, uma mensagem de erro eh fornecida
    else{
        res.status(400).send('Senha incorreta. Por favor tente novamente.\n');
    }
});


// Metodo para adicionar um usuario no cadastro
router.post('/api/usuarios', async function (req, res) {
	try{
		// Atribuicao dos valores de nome, idade, login e senha as variaveis correspondentes
		let cpfUsuario = req.body._id;
		let nomeUsuario = req.body.nome;
		let idadeUsuario = req.body.idade;
		let loginUsuario = req.body.login;
		let passwordUsuario = req.body.password;

        if(validate.validate(req.body, res) == 1){
            // Metodo bcrypt para criptografar a senha criada pelo usuario
            bcrypt.hash(passwordUsuario, saltRounds, async function(err, hash){
                // validate()
                passwordUsuario = hash;
                // Um novo objeto do tipo usuario eh criada com a senha criptografada
                let usuario = {
                    _id: cpfUsuario,
                    nome: nomeUsuario,
                    idade: idadeUsuario,
                    login: loginUsuario,
                    password: passwordUsuario
                };

                // Metodo insertOne() do mongoDB eh chamado
                await mongo.insertUser(usuario);

                // Ao criar o novo item, uma resposta eh enviada com o conteudo criado.
                res.send(usuario);
            });
        }
	}

	catch(err){

	}
	
});


// Metodo para atualizar os dados de um usuario
router.put('/api/usuarios/:id', async function (req, res) {
	try{
        // Atribuicao das variaveis
        // id recebe o identificador passado na rota
        let id = req.params.id;
        // userBody recebe toda a informacao a ser atualizada
        let userBody = req.body;
        // remocao dos campos que nao irao ser alterados
        delete userBody._id;
        delete userBody.login;
		delete userBody.password;

        if(validate.validate(userBody, res) == 1){
            // Metodo updateOne() do mongoDB eh chamado, passando as informacoes a serem atualizadas
		    await mongo.updateUser(id, userBody);

		    // Retorno do conteudo atualizado
		    res.send(userBody);
        }
	}
	
	catch{

	}
});

// Rota usada para a remocao de um usuario do cadastro, dado um id
router.delete('/api/usuarios/:id', async function (req, res) {
	try{
        // userQuery recebe o identificador passado na rota
        let userQuery = { _id: req.params.id };
        // usuario recebe o retorno do metodo deleteOne() do mongoDB
		let usuario = await mongo.deleteUser(userQuery);

		//Retorno do conteudo removido
		res.send(usuario);
	}

	catch{

	}
});

module.exports = router;