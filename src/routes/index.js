var vendas = require('./vendas/vendas.routes');
var produtos = require('./produtos/produtos.routes');
var vendedor = require('./vendedores/vendedores.routes');

module.exports = app => {
    [].concat(
        app.use('/vendas', vendas),
        app.use('/produtos', produtos),
        app.use('/vendedores', vendedor)
    )
};