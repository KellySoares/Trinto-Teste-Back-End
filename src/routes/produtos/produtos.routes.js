const router = require('express').Router();

const produto = require('../../controllers/produtos/produtos.controller.js');

router.post('/', produto.create);

router.get('/', produto.findAll);

router.get('/:id', produto.findOne);

router.put('/:id', produto.update);

router.delete('/:id', produto.delete);

module.exports = router;