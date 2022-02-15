const sql = require("../../config/db").getConnection();
const crypt = require('../../utils/crypt');
const jwt = require('jsonwebtoken');

// constructor
const Vendedor = function (vendedor) {
    this.id = vendedor.id;
    this.nome = vendedor.nome;
    this.cpf = vendedor.cpf;
    this.email = vendedor.email;
    this.senha = vendedor.senha;
};


Vendedor.insert = (vendedor, result) => {
    sql.then(async function (conn) {
        try {
            var pass = crypt.gerarSenha(vendedor.senha);

            const query = "INSERT INTO vendedores (`nome`, `cpf`, `email`, `senha`, `salt`) VALUES (?, ?, ? , ?, ?);";
            const rows = await conn.query(query, [vendedor.nome, vendedor.cpf, vendedor.email, pass.hash, pass.salt]);

            if (rows.affectedRows > 0) {
                result(null, { message: "Vendedor cadastrado com sucesso!", id: rows.insertId, ...vendedor });
            }

        } catch (err) {
            result(err, null);
            return;
        }
    })
};



Vendedor.find = (result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT nome, cpf, email FROM vendedores`);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Não existe Vendedores" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};

Vendedor.findOne = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT nome,cpf, email FROM vendedores  WHERE id = ?`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result({ message: "Vendedor não encontrado com o id: " + id }, null);
        } catch (err) {

            result(err, null);
            return;
        }
    })
};


Vendedor.updateOne = (id, vendedor, result) => {
    sql.then(async function (conn) {
        try {


            var itens = [];
            var conteudo = [];
            Object.keys(vendedor).forEach(function (item) {

                if (item === 'senha') {
                    var pass = crypt.gerarSenha(vendedor.senha);

                    itens.push("`" + item + "` = ? ");
                    conteudo.push(pass.hash);

                    itens.push("`salt` = ? ");
                    conteudo.push(pass.salt);
                } else {
                    itens.push("`" + item + "` = ? ");
                    conteudo.push(vendedor[item]);
                }

            });
            var campos = itens.toString();

            const query = "UPDATE vendedores SET " + campos + " WHERE id = ?";

            const rows = await conn.query(query, [...conteudo, id]);


            if (rows.affectedRows == 0) {
                result({ message: "Vendedor não encontrado com id: " + id }, null);
                return;
            }

            result(null, { id: id, message: "Vendedor alterado com sucesso!!!", ...vendedor });

        } catch (err) {
            result(err, null);
            return;
        }
    })
};

Vendedor.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`DELETE FROM vendedores WHERE id = ?`, id);
            if (rows.affectedRows == 0) {
                result({ message: "Vendedor não encontrado com id: " + id }, null);
                return;
            }
            result(null, { message: "Vendedor deletado com sucesso!!" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};


Vendedor.findCPF = (id, vendedor, result) => {
    sql.then(async function (conn) {
        try {


            if (id != undefined) {
                var rows = await conn.query(`SELECT cpf FROM vendedores  WHERE cpf = ? AND id != ?`, [vendedor, id]);
            } else {
                var rows = await conn.query(`SELECT cpf FROM vendedores  WHERE cpf = ? `, vendedor);
            }

            if (rows.length > 0) {
                return result({ message: "CPF ja foi cadastrado!" }, null);
            }
            return result(null, { message: "CPF nao foi cadastrado" });
        } catch (err) {
            return result(err, null);
        }
    })
};

Vendedor.findEmail = (id, vendedor, result) => {
    sql.then(async function (conn) {
        try {

            if (id != undefined) {
                var rows = await conn.query(`SELECT email FROM vendedores  WHERE email = ? AND id != ?`, [vendedor, id]);
            } else {
                var rows = await conn.query(`SELECT email FROM vendedores  WHERE email = ? `, vendedor);
            }
            
            if (rows.length > 0) {
                return result({ message: "Email ja foi cadastrado!" }, null);
            }
            return result(null, { message: "Email nao foi cadastrado" });
        } catch (err) {
            return result(err, null);
        }
    })
};


Vendedor.findVendedorbyID = (vendedor, result) => {
    sql.then(async function (conn) {
        try {

            const rows = await conn.query(`SELECT * FROM vendedores  WHERE id = ?`, vendedor);

            if (rows.length > 0) {
                return result(null, { message: "Vendedor existe na tabela de vendedores!" });
            }
            return result({ message: "Vendedor nao existe na tabela de vendedores!!" }, null);
        } catch (err) {
            return result(err, null);
        }
    })
};


module.exports = Vendedor;

