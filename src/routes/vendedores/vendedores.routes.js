const router = require('express').Router();

const vendedor = require('../../controllers/vendedores/vendedores.controller.js');

router.post('/', vendedor.create);

router.get('/', vendedor.findAll);

router.get('/:id', vendedor.findOne);

router.put('/:id', vendedor.update);

router.delete('/:id', vendedor.delete);

module.exports = router;