const bcrypt = require('bcrypt');

// Metodo para verificar se a senha de entrada eh igual a senha registrada
async function verifyPassword(entryPassword, registeredPassword){
    //let hash = bcrypt.hashSync();
    // O metodo compare retorna true, caso as duas senhas sejam iguais
    let res = await bcrypt.compare(entryPassword, registeredPassword);
    return res;
}

module.exports = {
    verifyPassword
};