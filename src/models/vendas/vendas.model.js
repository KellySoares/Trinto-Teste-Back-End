const sql = require("../../config/db").getConnection();

// constructor
const Venda = function (venda) {
    this.id = venda.id;
    this.id_produto = venda.id_produto;
    this.id_vendedor = venda.id_vendedor;
    this.quantidade = venda.quantidade;
    this.preco_unit = venda.preco_unit;
};


Venda.insert = (venda, result) => {
    sql.then(async function (conn) {
        try {
            const total = venda.quantidade * venda.preco_unit;
            const query = "INSERT INTO vendas (`id_produto`, `id_vendedor`,`quantidade`,`preco_unit`, `preco_total`,`data`, `hora`) VALUES (?, ?, ?, ?, ?, NOw(), NOW());";
            const rows = await conn.query(query, [venda.id_produto, venda.id_vendedor, venda.quantidade, venda.preco_unit, total]);

            if (rows.affectedRows > 0) {
                result(null, { message: "Venda cadastrada com sucesso!", id: rows.insertId, ...venda, valor_total: total });
            }

        } catch (err) {
            if (err.errno === 1452) {

                var msg = err.text;
                var msg = msg.split(" ");

                result({
                    erro: err.errno,
                    message: "Não existe esse item na tabela de " + msg[19],
                    sqlMessage: err.sqlMessage
                }, null);
                return;
            } else {
                result(err, null);
                return;
            }

        }
    })
};

Venda.rank = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT v.id, v.nome,v.cpf, SUM(ve.preco_total) AS total, format((SUM(preco_total)/7), 2) AS media

            FROM vendedores v
          INNER JOIN vendas ve ON ve.id_vendedor=v.id
          where ve.data BETWEEN '2022-01-02' and '2022-02-10'
          GROUP BY v.id ORDER BY total DESC LIMIT 0,10`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Não existe Vendas" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Venda.find = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT v.nome, v.cpf,p.produto,p.preco, ve.quantidade, ve.preco_total,DATE_FORMAT(ve.data, '%d-%m-%Y') as data, ve.hora 
            FROM vendas ve
          INNER JOIN vendedores v ON ve.id_vendedor=v.id
          INNER JOIN produtos p ON ve.id_produto=p.id
          ORDER BY v.nome, ve.data desc, ve.hora desc`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Não existe Vendas" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Venda.findOne = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT v.nome, v.cpf,p.produto,p.preco, ve.quantidade, ve.preco_total,DATE_FORMAT(ve.data, '%d-%m-%Y') as data, ve.hora 
            FROM vendas ve
          INNER JOIN vendedores v ON ve.id_vendedor=v.id
          INNER JOIN produtos p ON ve.id_produto=p.id
          WHERE ve.id = ?
          ORDER BY v.nome, ve.data desc, ve.hora desc`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Venda não encontrada com o id: " + id });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Venda.updateOne = (id, venda, result) => {
    sql.then(async function (conn) {
        try {

            var itens = [];
            var conteudo = [];
            Object.keys(venda).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(venda[item]);
            });
            var campos = itens.toString();

            const total = venda.quantidade * venda.preco_unit;

            const query = "UPDATE vendas SET " + campos + ", preco_total=(preco_unit * quantidade) WHERE id = ?";

            const rows = await conn.query(query, [...conteudo, id]);


            if (rows.affectedRows == 0) {
                result({ message: "Venda não encontrada" }, null);
                return;
            }

            result(null, { id: id, message: "Venda alterada com sucesso!!!", ...venda });

        } catch (err) {

            if (err.errno === 1452) {

                var msg = err.text;
                var msg = msg.split(" ");

                result({
                    erro: err.errno,
                    message: "Não existe esse item na tabela de " + msg[19],
                    sqlMessage: err.sqlMessage
                }, null);
                return;
            } else {
                result(err, null);
                return;
            }
        }
    })
};

Venda.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`DELETE FROM vendas WHERE id = ?`, id);
            if (rows.affectedRows == 0) {
                result({ message: "Venda não encontrada" }, null);
                return;
            }
            result(null, { message: "Venda deletada com sucesso!!" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};


module.exports = Venda;

