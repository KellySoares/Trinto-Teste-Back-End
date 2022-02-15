const Produto = require('../../models/produtos/produtos.model');

exports.create = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    const { id, cod_produto, nome, preco, estoque, ativo } = req.body;

    var produtos = new Produto({
        id: id,
        cod_produto: cod_produto,
        nome: nome,
        preco: preco,
        estoque: estoque,
        ativo: ativo

    });


    Produto.insert(produtos, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(201).send(data);
    });

}

exports.findAll = (req, res) => {

    Produto.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else res.status(200).send(data);
    });

}

exports.findOne = (req, res) => {

    Produto.findOne(req.params.id, (err, data) => {
        if (err) {
            if (err.message !== '') {
                res.status(400).send(err);
            } else res.status(500).send(err);
        } else res.status(200).send(data);
    });

}

exports.update = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    Produto.updateOne(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.message !== '') {
                res.status(400).send(err);
            } else res.status(500).send(err);
        } else res.status(201).send(data);
    });

}
exports.delete = (req, res) => {

    Produto.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.message !== '') {
                res.status(400).send(err);
            } else res.status(500).send(err);
        } else res.status(200).send(data);
    });

}