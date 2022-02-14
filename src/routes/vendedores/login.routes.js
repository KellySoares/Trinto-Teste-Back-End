const router = require('express').Router();

const login = require('../../controllers/vendedores/login.controller.js');

const { body } = require('express-validator');
const { validar } = require("../../utils/validation");

router.get('/', [
    body('email')
        .notEmpty().withMessage("O campo email é obrigatório")
        .isEmail().withMessage('Email Inválido!'),
    body('senha')
        .isLength({ min: 6 }).withMessage('Digite uma senha no minimo 6 caracteres!')
], validar, login.login);


module.exports = router;