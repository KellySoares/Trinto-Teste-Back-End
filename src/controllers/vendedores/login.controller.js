const Login = require('../../models/vendedores/login.model');


exports.login = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    Login.getLogin(req.body, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}



