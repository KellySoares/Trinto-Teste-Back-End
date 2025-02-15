const { validationResult } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator');
const Vendedor = require('../models/vendedores/vendedores.model');

const Produto = require('../models/produtos/produtos.model');

module.exports = {
    existProduto(req, res, next) {

        Produto.findProdutobyID(req.body.id_produto, (err, data) => {
            if (err)
                return res.status(400).json(err);
            else return next();
        });

    },
    existVendedor(req, res, next) {

        Vendedor.findVendedorbyID(req.body.id_vendedor, (err, data) => {
            if (err)
                return res.status(400).json(err);
            else return next();
        });

    },
    validarProduto(req, res, next) {

        Produto.findProduto(req.params.id, req.body.cod_produto, (err, data) => {
            if (err)
                return res.status(400).json(err);
            else return next();
        });

    },
    validarEmail(req, res, next) {

        Vendedor.findEmail(req.params.id, req.body.email, (err, data) => {
            if (err)
                return res.status(400).json(err);
            else return next();
        });

    },
    validarCpf(req, res, next) {
        const result = cpf.isValid(req.body.cpf);
        if (!result) {
            return res.status(400).json({ message: "CPF inválido!!" });
        }
        req.body.cpf = cpf.format(req.body.cpf);

        Vendedor.findCPF(req.params.id, req.body.cpf, (err, data) => {
            if (err)
                return res.status(400).json(err);
            else return next();
        });

    },
    validar(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};