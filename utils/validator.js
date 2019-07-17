// numero minimo de characteres que um nome deve conter
const minChar = 4;

function validate(userBody, res){
    let nomeUsuario = userBody.nome;
    let idadeUsuario = userBody.idade;

    // Caso o nome nao tenha sido fornecido, uma mensagem de erro eh reportada e a insercao cancelada.
		if (!nomeUsuario) {
			res.status(400).send('Necessario fornecer um nome.');
			return 0;
		}
		// Caso o nome nao seja maior que um numero especifico de caracteres, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (nomeUsuario.length < minChar) {
            res.status(400).send('O nome fornecido deve possuir mais de 4 caracteres.');
			return 0;
		}
		// Caso a idade do usuario nao seja fornecida, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (!idadeUsuario) {
			res.status(400).send('Necessario fornecer a idade do usuario.');
			return 0;
		}
		// Caso a idade de um usuario seja negativa, uma mensagem de erro eh reportada e a insercao cancelada.
		else if (idadeUsuario < 0) {
			res.status(400).send('A idade de um usuario nao pode ser negativa.');
			return 0;
        }

        // Retorno positivo caso nao haja erros na verificacao
        return 1;
}

module.exports = {
    validate
};