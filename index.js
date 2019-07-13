const express = require('express');
const app = express();

//numero minimo de characteres que um nome deve conter
const minChar = 4;

//adicionando um middleware para permitir o uso de json nos requests
app.use(express.json());

//Array de usuarios inicialmente cadastrados
const usuarios = [
	{id: 1, nome: 'Joao da Silva', idade: '28'},
	{id: 2, nome: 'Pedro Paulo', idade: '19'},
	{id: 3, nome: 'Ricardo Ferraz', idade: '40'},
	{id: 4, nome: 'Jose Antonio', idade: '31'}
];


// Tela inicial (root) da aplicacao contendo pequena mensagem
app.get('/', function(req, res){
	res.send('Exercicio REST-API SF Labs. Funcoes simples como visualizar, inserir, atualizar ou remover usuarios podem ser executadas com a ferramenta Postman.');
});


// Pedido para acessar a lista completa de usuarios cadastrados
app.get('/api/usuarios', function(req, res){
	//Caso nao existam usuarios cadastrados, uma simples mensagem de erro eh mostrada
	if(!usuarios){
		res.status(404).send('Nao existem usuarios cadastrados');
	}
	//senao, a lista dos usuarios cadastrados atualmente eh enviada como resposta
	else
		res.send(usuarios);
});


// Metodo para encontrar o usuario com id especifico
app.get('/api/usuarios/:id', function(req, res){
	//Atribuo a variavel usuario o valor estabelecido em 'id'
	const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
	//Caso este id nao exista nos registros, um erro simples eh retornado
	if(!usuario){
		res.status(404).send('O usuario com o id requisitado nao foi encontrado.');
		return;
	}
	//Caso contrario, o usuario eh retornado
	res.send(usuario);
});


// Metodo para adicionar um usuario no cadastro
app.post('/api/usuarios', function(req, res){
	//Atribuicao dos valores de nome e idade as variaveis correspondentes
	console.log(req.body);
	/*const { nomeUsuario, idadeUsuario } = req.body;*/
	const nomeUsuario = req.body.nome;
	const idadeUsuario = req.body.idade;

	//Caso o nome nao tenha sido fornecido, uma mensagem de erro eh reportada e a insercao cancelada.
	if(!nomeUsuario){
		res.status(400).send('Necessario fornecer um nome.');
		return;
	}
	//Caso o nome nao seja maior que um numero especifico de caracteres, uma mensagem de erro eh reportada e a insercao cancelada.
	else if(nomeUsuario.length < minChar){
		res.status(400).send('O nome fornecido deve possuir mais de 4 caracteres.');
		return;
	}
	//Caso a idade do usuario nao seja fornecida, uma mensagem de erro eh reportada e a insercao cancelada.
	else if(!idadeUsuario){
		res.status(400).send('Necessario fornecer a idade do usuario.');
		return;
	}
	//Caso a idade de um usuario seja negativa, uma mensagem de erro eh reportada e a insercao cancelada.
	else if(idadeUsuario < 0){
		res.status(400).send('A idade de um usuario nao pode ser negativa.');
		return;
	}

	//Uma nova variavel do tipo usuario eh criada com os valores que se deseja inserir.
	const usuario = {
		id: usuarios.length + 1,
		nome: nomeUsuario,
		idade: idadeUsuario
	};

	//O novo usuario eh inserido no array de usuarios
	usuarios.push(usuario);
	//Ao criar o novo item, uma resposta eh enviada com o conteudo criado.
	res.send(usuario);
});


//Metodo para atualizar os dados de um usuario
app.put('/api/usuarios/:id', function(req, res){
	//Primeiro busca-se pelo id do usuario no array de usuarios cadastrados.
	const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
	//Caso ele nao exista, uma mensagem de erro eh reportada e a atualizacao cancelada.
	if(!usuario){
		res.status(404).send('O usuario com o id requisitado nao foi encontrado.');
		return;
	}

	//Atribuicao dos valores de nome e idade as variaveis correspondentes
	const nomeUsuario = req.body.nome;
	const idadeUsuario = req.body.idade;

	//A seguir, a mesma validacao dos dados realizada na insercao eh feita para a atualizacao

	//Caso o nome nao tenha sido fornecido, uma mensagem de erro eh reportada e a atualizacao cancelada.
	if(!nomeUsuario){
		res.status(400).send('Necessario fornecer um nome.');
		return;
	}
	//Caso o nome nao seja maior que um numero especifico de caracteres, uma mensagem de erro eh reportada e a atualizacao cancelada.
	else if(nomeUsuario.length < minChar){
		res.status(400).send('O nome fornecido deve possuir mais de 4 caracteres.');
		return;
	}
	//Caso a idade do usuario nao seja fornecida, uma mensagem de erro eh reportada e a atualizacao cancelada.
	else if(!idadeUsuario){
		res.status(400).send('Necessario fornecer a idade do usuario.');
		return;
	}
	//Caso a idade de um usuario seja negativa, uma mensagem de erro eh reportada e a atualizacao cancelada.
	else if(idadeUsuario < 0){
		res.status(400).send('A idade de um usuario nao pode ser negativa.');
		return;
	}

	//A atualizacao do cadastro existente eh realizada
	usuario.nome = nomeUsuario;
	usuario.idade = idadeUsuario;

	//Retorno do conteudo atualizado
	res.send(usuario);
});


app.delete('/api/usuarios/:id', function(req, res){
	//Primeiro busca-se pelo id do usuario no array de usuarios cadastrados.
	const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
	//Caso ele nao exista, uma mensagem de erro eh reportada e a operacao deletar eh cancelada.
	if(!usuario){
		res.status(404).send('O usuario com o id requisitado nao foi encontrado.');
		return;
	}

	//Buscamos pelo indice do usuario que se deseja remover no array de usuarios cadastrados
	const index = usuarios.indexOf(usuario);
	//Removemos do array, usando splice, 1 objeto encontrado no indice = index
	usuarios.splice(index, 1);

	//Retorno do conteudo removido
	res.send(usuario);
});


// 'port' ira receber a PORT de algum ambiente de processos existente, ou 1234.
const port = 1234;
//const port = process.env.PORT || 1234;

//Diz no console em qual porta esta conectado
app.listen(port, function(){
	console.log(`Listening on port ${port}...`);
});