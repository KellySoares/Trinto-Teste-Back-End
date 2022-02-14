const router = require('express').Router();

const venda = require('../../controllers/vendas/vendas.controller.js');

router.post('/', venda.create);

router.get('/rank', venda.rank10);

router.get('/', venda.findAll);

router.get('/:id', venda.findOne);

router.put('/:id', venda.update);

router.delete('/:id', venda.delete);

module.exports = router;