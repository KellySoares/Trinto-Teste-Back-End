const sql = require("../../config/db").getConnection();

// constructor
const Produto = function (produto) {
    this.id = produto.id;
    this.produto = produto.produto;
    this.preco = produto.preco;
};


Produto.insert = (produto, result) => {
    sql.then(async function (conn) {
        try {
            const query = "INSERT INTO produtos (`produto`, `preco`) VALUES (?, ?);";
            const rows = await conn.query(query, [produto.produto, produto.preco]);

            if (rows.affectedRows > 0) {
                result(null, { message: "Produto cadastrado com sucesso!", id: rows.insertId, ...produto });
            }

        } catch (err) {
            result(err, null);
            return;

        }
    })
};


Produto.find = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT * FROM produtos`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Não existe Produtos" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Produto.findOne = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT * FROM produtos  WHERE id = ?`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Produto não encontrado com o id: " + id });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Produto.updateOne = (id, produto, result) => {
    sql.then(async function (conn) {
        try {

            var itens = [];
            var conteudo = [];
            Object.keys(produto).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(produto[item]);
            });
            var campos = itens.toString();

            const total = produto.quantidade * produto.preco_unit;

            const query = "UPDATE produtos SET " + campos + " WHERE id = ?";

            const rows = await conn.query(query, [...conteudo, id]);


            if (rows.affectedRows == 0) {
                result({ message: "Produto não encontrado" }, null);
                return;
            }

            result(null, { id: id, message: "Produto alterado com sucesso!!!", ...produto });

        } catch (err) {


            result(err, null);
            return;

        }
    })
};

Produto.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`DELETE FROM produtos WHERE id = ?`, id);
            if (rows.affectedRows == 0) {
                result({ message: "Produto não encontrado" }, null);
                return;
            }
            result(null, { message: "Produto deletado com sucesso!!" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};


module.exports = Produto;

