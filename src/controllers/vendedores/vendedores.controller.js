const Vendedor = require('../../models/vendedores/vendedores.model');

exports.create = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    const { id, nome, cpf, email, senha } = req.body;

    var vendedores = new Vendedor({
        id: id,
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha

    });


    Vendedor.insert(vendedores, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.findAll = (req, res) => {

    Vendedor.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.findOne = (req, res) => {

    Vendedor.findOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.update = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    Vendedor.updateOne(req.params.id, req.body, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}
exports.delete = (req, res) => {

    Vendedor.remove(req.params.id, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}