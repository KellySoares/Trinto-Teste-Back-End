const Venda = require('../../models/vendas/vendas.model');

exports.create = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    const { id, id_produto, id_vendedor, quantidade, preco_unit } = req.body;

    var venda = new Venda({
        id: id,
        id_produto: id_produto,
        id_vendedor: id_vendedor,
        quantidade: quantidade,
        preco_unit: preco_unit,

    });


    Venda.insert(venda, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}
exports.rank10 = (req, res) => {

    Venda.rank((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.findAll = (req, res) => {

    Venda.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.findOne = (req, res) => {

    Venda.findOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}

exports.update = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    Venda.updateOne(req.params.id, req.body, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}
exports.delete = (req, res) => {

    Venda.remove(req.params.id, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}