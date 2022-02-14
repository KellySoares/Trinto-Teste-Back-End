const router = require('express').Router();

const produto = require('../../controllers/produtos/produtos.controller.js');
const { body } = require('express-validator');
const { validar, validarProduto } = require("../../utils/validation");

router.post('/', [
    body('cod_produto')
        .notEmpty().withMessage("O campo cod_produto é obrigatório"),
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório"),
    body('preco')
        .notEmpty().withMessage("O campo preco é obrigatório")
        .isNumeric().withMessage('O campo preco é somente número! Formato: 0 ou 0.00'),
    body('estoque')
        .notEmpty().withMessage("O campo estoque é obrigatório")
        .isInt().withMessage('O campo estoque é somente número inteiro!'),
    body('ativo')
        .notEmpty().withMessage("O campo ativo é obrigatório")
        .toBoolean().withMessage('O campo ativo é somente booleano!')
], validar, validarProduto, produto.create);

router.get('/', produto.findAll);

router.get('/:id', produto.findOne);

router.put('/:id', [
    body('cod_produto')
        .notEmpty().withMessage("O campo cod_produto é obrigatório"),
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório"),
    body('preco')
        .notEmpty().withMessage("O campo preco é obrigatório")
        .isNumeric().withMessage('O campo preco é somente número! Formato: 0 ou 0.00'),
    body('estoque')
        .notEmpty().withMessage("O campo estoque é obrigatório")
        .isInt().withMessage('O campo estoque é somente número inteiro!'),
    body('ativo')
        .notEmpty().withMessage("O campo ativo é obrigatório")
        .isInt().withMessage('O campo ativo é somente número inteiro! 0 ou 1')
], validar, validarProduto, produto.update);

router.delete('/:id', produto.delete);

module.exports = router;