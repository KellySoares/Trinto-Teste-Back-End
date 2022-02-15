const sql = require("../../config/db").getConnection();

// constructor
const Venda = function (venda) {
    this.id = venda.id;
    this.id_produto = venda.id_produto;
    this.id_vendedor = venda.id_vendedor;
    this.quantidade = venda.quantidade;
};


Venda.insert = (venda, result) => {
    sql.then(async function (conn) {
        try {

            const prod = await conn.query(`SELECT estoque, preco FROM produtos WHERE id = ? and ativo = 1`, venda.id_produto);
            if (prod.length > 0) {
                if ((prod[0].estoque - venda.quantidade) >= 0) {

                    const preco = prod[0].preco;
                    const total = venda.quantidade * prod[0].preco;
                    const query = "INSERT INTO vendas (`id_produto`, `id_vendedor`,`quantidade`,`preco_unit`, `preco_total`,`data`, `hora`) VALUES (?, ?, ?, ?, ?, NOw(), NOW());";
                    const rows = await conn.query(query, [venda.id_produto, venda.id_vendedor, venda.quantidade, preco, total]);

                    if (rows.affectedRows > 0) {

                        result(null, { message: "Venda cadastrada com sucesso!", id: rows.insertId, ...venda, preco: prod[0].preco, valor_total: total, restante: (prod[0].estoque - venda.quantidade) });
                        return;
                    }

                } else {
                    result({ message: `Quantidade maior do que a existente no estoque do produto. Quantidade no estoque: ${prod[0].estoque}` }, null);
                    return;
                }
            }

            result({ message: "Produto está indisponível no momento!" }, null);
            return;

        } catch (err) {
            result(err, null);
            return;

        }
    })
};

Venda.rank = (vendas, result) => {
    sql.then(async function (conn) {
        try {

            var data_inicio = vendas.data_inicio;
            var data_final = vendas.data_final;
            data_inicio = data_inicio.replace(/\/+/g, '-');
            data_final = data_final.replace(/\/+/g, '-');


            let arrayInicio = data_inicio.split("-");
            let arrayFim = data_final.split("-");

            data_inicio = arrayInicio[2] + '-' + arrayInicio[1] + '-' + arrayInicio[0];
            data_final = arrayFim[2] + '-' + arrayFim[1] + '-' + arrayFim[0];


            const rows = await conn.query(`SELECT v.id, v.nome,v.cpf, SUM(ve.preco_total) AS total, format((SUM(preco_total)/7), 2) AS media

            FROM vendedores v
          INNER JOIN vendas ve ON ve.id_vendedor=v.id
          where ve.data BETWEEN '${data_inicio}' and '${data_final}'
          GROUP BY v.id ORDER BY total DESC LIMIT 0,10`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result({ message: "Não existe Vendas neste período, altere o período buscado!" }, null);
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Venda.find = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT v.nome, v.cpf,p.cod_produto, p.nome as nome_produto,p.preco, ve.quantidade, ve.preco_total,DATE_FORMAT(ve.data, '%d-%m-%Y') as data, ve.hora 
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
            const rows = await conn.query(`SELECT v.nome, v.cpf,p.cod_produto,p.nome as nome_produto, p.preco, ve.quantidade, ve.preco_total,DATE_FORMAT(ve.data, '%d-%m-%Y') as data, ve.hora 
            FROM vendas ve
          INNER JOIN vendedores v ON ve.id_vendedor=v.id
          INNER JOIN produtos p ON ve.id_produto=p.id
          WHERE ve.id = ?
          ORDER BY v.nome, ve.data desc, ve.hora desc`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result({ message: "Venda não encontrada com o id: " + id }, null);
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Venda.updateOne = (id, venda, result) => {
    sql.then(async function (conn) {
        try {

            const prod = await conn.query(`SELECT estoque, preco FROM produtos WHERE id = ? and ativo = 1`, venda.id_produto);


            if (prod.length > 0) {
                const vendaQuand = await conn.query(`SELECT * FROM vendas WHERE id = ?`, id);
                if (((prod[0].estoque + vendaQuand[0].quantidade) - venda.quantidade) >= 0) {

                    var itens = [];
                    var conteudo = [];
                    Object.keys(venda).forEach(function (item) {
                        itens.push("`" + item + "` = ? ");
                        conteudo.push(venda[item]);
                    });
                    var campos = itens.toString();

                    const preco = prod[0].preco;
                    const total = venda.quantidade * prod[0].preco;

                    const query = "UPDATE vendas SET " + campos + ", preco_unit = ?, preco_total= ? WHERE id = ?";

                    const rows = await conn.query(query, [...conteudo, preco, total, id]);


                    if (rows.affectedRows == 0) {
                        result({ message: "Venda não encontrada com id: " + id }, null);
                        return;
                    }

                    result(null, { id: id, message: "Venda alterada com sucesso!!!", ...venda, preco: preco, total: total, restante: ((prod[0].estoque + vendaQuand[0].quantidade) - venda.quantidade) });
                    return;
                } else {
                    result({ message: `Quantidade maior do que a existente no estoque do produto. Quantidade no estoque: ${prod[0].estoque}` }, null);
                    return;
                }
            }

            result({ message: "Produto está indisponível no momento!" }, null);
            return;
        } catch (err) {

            result(err, null);
            return;

        }
    })
};

Venda.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`DELETE FROM vendas WHERE id = ?`, id);
            if (rows.affectedRows == 0) {
                result({ message: "Venda não encontrada com id: " + id }, null);
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

