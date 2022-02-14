const router = require('express').Router();

const venda = require('../../controllers/vendas/vendas.controller.js');

const { body } = require('express-validator');
const { validar } = require("../../utils/validation");

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
], validar, venda.create);

router.get('/rank', venda.rank10);

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
], validar, venda.update);

router.delete('/:id', venda.delete);

module.exports = router;