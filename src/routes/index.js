var vendas = require('./vendas/vendas.routes');
var produtos = require('./produtos/produtos.routes');
var vendedor = require('./vendedores/vendedores.routes');
var login = require('./vendedores/login.routes');

const jwt = require("../utils/JWT");

module.exports = app => {
    [].concat(
        app.use('/vendas', jwt.verifyJWT, vendas),
        app.use('/produtos', jwt.verifyJWT, produtos),
        app.use('/vendedores', vendedor),
        app.use('/login', login),
    )
};