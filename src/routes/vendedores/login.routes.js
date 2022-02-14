const router = require('express').Router();

const login = require('../../controllers/vendedores/login.controller.js');


router.get('/', login.login);


module.exports = router;