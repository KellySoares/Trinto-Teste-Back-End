const sql = require("../../config/db").getConnection();

// constructor
const Produto = function (produto) {
    this.id = produto.id;
    this.cod_produto = produto.cod_produto;
    this.nome = produto.nome;
    this.preco = produto.preco;
    this.estoque = produto.estoque;
    this.ativo = produto.ativo;
};


Produto.insert = (produto, result) => {
    sql.then(async function (conn) {
        try {
            const query = "INSERT INTO produtos (`cod_produto`, `nome`,`preco`, `estoque`,`ativo`) VALUES (?, ?, ?, ?, ?);";
            const rows = await conn.query(query, [produto.cod_produto, produto.nome, produto.preco, produto.estoque, produto.ativo]);

            if (rows.affectedRows > 0) {
                result(null, { message: "Produto cadastrado com sucesso!", id: rows.insertId, ...produto });
            }

        } catch (err) {
            if (err.errno === 1062) {
                var msg = err.text;
                var msg = msg.split(" ");

                result({
                    erro: err.errno,
                    message: msg[5] + ": " + msg[2] + " já existe no sistema."
                }, null);
                return;
            } else {
                result(err, null);
                return;
            }

        }
    })
};


Produto.find = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT cod_produto, nome, preco, estoque,  
            CASE  WHEN ativo = 0 THEN 'Indisponivel' WHEN ativo = 1 THEN 'Disponivel'   END as situacao,
            CASE  WHEN ativo = 0 THEN DATE_FORMAT(deleted, '%d-%m-%Y %T') WHEN ativo = 1 THEN ''   END as data_deletado
            FROM produtos`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result({ message: "Não existe Produtos" },null);
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Produto.findOne = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT cod_produto, nome, preco, estoque,  
            CASE  WHEN ativo = 0 THEN 'Indisponivel' WHEN ativo = 1 THEN 'Disponivel'   END as situacao,
            CASE  WHEN ativo = 0 THEN DATE_FORMAT(deleted, '%d-%m-%Y %T') WHEN ativo = 1 THEN ''   END as data_deletado FROM produtos  WHERE id = ?`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result({ message: "Produto não encontrado com o id: " + id }, null);
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

            if (err.errno === 1062) {
                var msg = err.text;
                var msg = msg.split(" ");

                result({
                    erro: err.errno,
                    message: msg[5] + ": " + msg[2] + " já existe no sistema."
                }, null);
                return;
            } else {
                result(err, null);
                return;
            }


        }
    })
};

Produto.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const query = "UPDATE produtos SET `ativo`= 0, `deleted`= NOW() WHERE id = ?";
            const rows = await conn.query(query, id);
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

Produto.updateEstoque = (produto, result) => {
    sql.then(async function (conn) {
        try {

            const query = "UPDATE produtos SET estoque=(estoque - ?) WHERE id = ?";

            const rows = await conn.query(query, [produto.quantidade, produto.id_produto]);


            if (rows.affectedRows == 0) {
                result({ message: "Estoque não alterado" }, null);
                return;
            }

            result(null, { id: produto.id_produto, message: "Estoque do produto alterado com sucesso!!!" });
            return;
        } catch (err) {
            result(err, null);
            return;
        }
    })
};

module.exports = Produto;

