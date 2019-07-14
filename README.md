## Instalação
Para rodar o programa, é necessário instalar:
- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=pt-BR) extensão do Chrome,
- [Node.js](https://nodejs.org/en/download/) em seu computador
- Acessar o repositório e executar os comandos no terminal:

```
$ npm install
$ npm init --yes
$ npm i express
```
## Executando
Uma vez acessado o repositório e feita a instalação dos pacotes necessários, para executar o programa basta rodar a seguinte linha de código no terminal:
```
$ npm index.js
```
### Porta 1234
-----------------------------------
O programa acessa a porta 1234 para se comunicar com o servidor que é criado. Este número é importante para o acesso à seguir - Pode ser modificado dentro do arquivo.

## Postman
Uma vez executado o código, basta abrir a extensão Postman e acessar a seguinte url:
```
http://localhost:1234/api/usuarios
```
para poder realizar uma das seguintes tarefas:

- Buscar um usuário específico:
	Utilizando o comando **GET** seguido de um número identificador (inteiro) o resultado será o conteúdo daquele usuário
	Exemplo:
```
http://localhost:1234/api/usuarios/2
```
Irá retornar os dados do segundo usuário cadastrado no array de usuários.


- Buscar por TODOS os usuários:
	Ainda com o comando **GET**, porém sem um número identificador podemos obter a lista completa de usuários cadastrados
	Exemplo:
```
http://localhost:1234/api/usuarios/
```
Retorna todo o array de usuários cadastrados.

- Inserir um novo usuário:
	Utilizando o comando **POST**, é possível inserir um novo usuário ao array colocando as informações deste usuário em "Body" - Modificar a entrada para JSON
	Os usuários possuem apenas dois campos de identificação (além de ID) sendo estes
		Nome
		Idade
	Exemplo:
```
Utilizando POST
http://localhost:1234/api/usuarios/
{
	nome: "Fulano da Silva",
	idade: "38"
}
```

- Modificar as informações de um usuário:
	Com o comando **PUT**, podemos acessar o conteúdo de um usuário e modificá-lo, sem alterar o seu ID.
	Exemplo:
```
	Utilizando PUT
	http://localhost:1234/api/usuarios/3
	{
		nome: "Novo Nome e Idade"
		idade: "50"
	}
	
	Verificando com GET
	http://localhost:1234/api/usuarios/3
	Resultado:
	{
		id: "3"
		nome: "Novo Nome e Idade"
		idade: "50"
	}
```

- Remover um usuário do array de usuários cadastrados:
	Através do comando **DELETE** e a passagem do ID do usuário que deseja-se remover.
	Exemplo:
```
	Utilizando DELETE
	http://localhost:1234/api/usuarios/3
```


## Mensagens de erro:
Quando algo fugir dos padrões, uma simples mensagem de erro será apresentada ao usuário informando o ocorrido e o status do erro será setado e apresentado pelo Postman - Erro 404, Erro 400, etc.

