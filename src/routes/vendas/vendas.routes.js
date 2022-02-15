const router = require('express').Router();

const venda = require('../../controllers/vendas/vendas.controller.js');

const { body } = require('express-validator');
const { validar, existProduto, existVendedor } = require("../../utils/validation");

router.post('/', [
    body('id_produto')
        .notEmpty().withMessage("O campo id_produto é obrigatório")
        .isInt().withMessage('O campo id_produto é somente número inteiro!'),
    body('id_vendedor')
        .notEmpty().withMessage("O campo id_vendedor é obrigatório")
        .isInt().withMessage('O campo id_vendedor é somente número inteiro!'),
    body('quantidade')
        .notEmpty().withMessage("O campo quantidade é obrigatório")
        .isInt().withMessage('O campo quantidade é somente número inteiro!')
], validar, existVendedor, existProduto, venda.create);

router.get('/rank', [
    body('data_inicio')
        .notEmpty().withMessage("O campo data_inicio é obrigatório! Formato: dia-mes-ano")
        .isLength({ min: 10, max: 10 }).withMessage('Campo data_inicio tem tamanho 10! Formato: dia-mes-ano'),
    body('data_final')
        .notEmpty().withMessage("O campo data_final é obrigatório!  Formato: dia-mes-ano")
        .isLength({ min: 10, max: 10 }).withMessage('Campo data_final tem tamanho 10! Formato: dia-mes-ano')

], validar, venda.rank10);

router.get('/', venda.findAll);

router.get('/:id', venda.findOne);

router.put('/:id', [
    body('id_produto')
        .notEmpty().withMessage("O campo id_produto é obrigatório")
        .isInt().withMessage('O campo id_produto é somente número inteiro!'),
    body('id_vendedor')
        .notEmpty().withMessage("O campo id_vendedor é obrigatório")
        .isInt().withMessage('O campo id_vendedor é somente número inteiro!'),
    body('quantidade')
        .notEmpty().withMessage("O campo quantidade é obrigatório")
        .isInt().withMessage('O campo quantidade é somente número inteiro!')
], validar, existVendedor, existProduto, venda.update);

router.delete('/:id', venda.delete);

module.exports = router;