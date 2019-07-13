const express = require('express');
const app = express();

//adicionando um middleware para permitir o uso de json nos requests
app.use(express.json());

const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'},
];

//quando no root do site, respondemos com hello world
app.get('/', function(req, res){
	res.send('Hello World!!!');
});

app.get('/api/courses', function(req, res){
	res.send(courses);
});

app.get('/api/courses/:id', function(req,res){
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course){ //404
		res.status(404).send('The course with the given id was not found');
		return;
	}
	res.send(course);
})

app.post('/api/courses', function(req, res){
	if(!req.body.name || req.body.name.lenght < 3){
		//400 bad request
		res.status(400).send('Name is required and should be minimum 3 characters.');
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};

	//coloca o novo course no array courses
	courses.push(course);
	//por convencao, quando isto o servidor cria um novo item, retornamos como resposta o que foi inserido
	res.send(course);
});

app.put('/api/courses/:id', function(req, res){
	//procurar pelo course
	//se nao existir, restorna 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course){ //404
		res.status(404).send('The course with the given id was not found');
		return;
	}

	//Validar o course
	//se invalido, retorna 400 - bad request

	//update
	course.name = req.body.name;
	//retorna o course update
	res.send(course);
});

app.delete('/api/courses/:id', function(req, res){
	//procurar
	//se n existir, retorna 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course){ //404
		res.status(404).send('The course with the given id was not found');
		return;
	}
	//deletar
	const index = courses.indexOf(course);
	courses.splice(index, 1);


	//retornar o mesmo course
	res.send(course);
});


// port ira receber a PORT de algum ambiente de processos existente, ou 3000.
const port = process.env.PORT || 3000;

// diz em qual porta esta conectado
app.listen(port, function(){
	console.log(`Listening on port ${port}...`);
});