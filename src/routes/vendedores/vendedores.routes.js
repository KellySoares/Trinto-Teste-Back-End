const router = require('express').Router();

const vendedor = require('../../controllers/vendedores/vendedores.controller.js');


const { body } = require('express-validator');
const { validar, validarCpf, validarEmail } = require("../../utils/validation");

const jwt = require("../../utils/JWT");

router.post('/', [
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório"),
    body('cpf')
        .notEmpty().withMessage("O campo cpf é obrigatório")
        .isInt().withMessage('Cpf é somente número inteiro!')
        .isLength({ min: 11, max: 11 }).withMessage('Campo cpf aceita apenas 11 números!'),
    body('email')
        .notEmpty().withMessage("O campo email é obrigatório")
        .isEmail().withMessage('Email Inválido!'),
    body('senha')
        .isLength({ min: 6 }).withMessage('Digite uma senha no minimo 6 caracteres!')
], validar, validarCpf, validarEmail, vendedor.create);

router.get('/', jwt.verifyJWT, vendedor.findAll);

router.get('/:id', jwt.verifyJWT, vendedor.findOne);

router.put('/:id', jwt.verifyJWT, [
    body('nome').optional()
        .notEmpty().withMessage("O campo nome é obrigatório"),
    body('cpf')
        .notEmpty().withMessage("O campo cpf é obrigatório")
        .isInt().withMessage('Cpf é somente número inteiro!')
        .isLength({ min: 11, max: 11 }).withMessage('Campo cpf aceita apenas 11 números!'),
    body('email')
        .notEmpty().withMessage("O campo email é obrigatório")
        .isEmail().withMessage('Email Inválido!'),
    body('senha').optional()
        .isLength({ min: 6 }).withMessage('Digite uma senha no minimo 6 caracteres!')
], validar, validarCpf, validarEmail, vendedor.update);

router.delete('/:id', jwt.verifyJWT, vendedor.delete);

module.exports = router;