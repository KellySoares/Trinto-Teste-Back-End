const Venda = require('../../models/vendas/vendas.model');
const Produto = require("../../models/produtos/produtos.model.js");

exports.create = (req, res) => {

    if (!req._body) {
        return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    }

    const { id, id_produto, id_vendedor, quantidade } = req.body;

    var venda = new Venda({
        id: id,
        id_produto: id_produto,
        id_vendedor: id_vendedor,
        quantidade: quantidade

    });


    Venda.insert(venda, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {

            Produto.updateEstoque(req.body, (err2, data2) => {
                if (err2) {
                    res.status(500).send(err2);
                } else {
                    res.status(200).send({ vendas: data, produto: data2 });
                }

            });


        }

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
        if (err) {
            res.status(500).send(err);
        } else {

            Produto.updateEstoque(req.body, (err2, data2) => {
                if (err2) {
                    res.status(500).send(err2);
                } else {
                    res.status(200).send({ vendas: data, produto: data2 });
                }

            });


        }
    });

}
exports.delete = (req, res) => {

    Venda.remove(req.params.id, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.status(200).send(data);
    });

}