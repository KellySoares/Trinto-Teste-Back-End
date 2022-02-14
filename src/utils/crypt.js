var crypto = require('crypto');

function gerarSalt() {
    return crypto.randomBytes(16).toString('hex');
};
function sha512(senha, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(senha);
    var hash = hash.digest('hex');
    return {
        salt,
        hash,
    };
};
module.exports = {
    gerarSenha(senha) {
        var salt = gerarSalt(16); 
        var senhaESalt = sha512(senha, salt); 
        return senhaESalt;
        
    },
    login(senha, salt, hash) {
        var senhaESalt = sha512(senha, salt);
        if(hash === senhaESalt.hash){
            return {
                hash: hash,
                login: true,
            };
        }else{
            return false;
        }   
     }
};