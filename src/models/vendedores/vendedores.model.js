const sql = require("../../config/db").getConnection();

// constructor
const Vendedor = function (vendedor) {
    this.id = vendedor.id;
    this.nome = vendedor.nome;
    this.cpf = vendedor.cpf;
    this.email = vendedor.email;
    this.senha = vendedor.senha;
    this.salt = vendedor.salt || '';
};


Vendedor.insert = (vendedor, result) => {
    sql.then(async function (conn) {
        try {
            const query = "INSERT INTO vendedores (`nome`, `cpf`, `email`, `senha`, `salt`) VALUES (?, ?, ? , ?, ?);";
            const rows = await conn.query(query, [vendedor.nome, vendedor.cpf, vendedor.email, vendedor.senha, vendedor.salt]);

            if (rows.affectedRows > 0) {
                result(null, { message: "Vendedor cadastrado com sucesso!", id: rows.insertId, ...vendedor });
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
            const rows = await conn.query(`SELECT nome, email FROM vendedores  WHERE id = ?`, id);
            if (rows.length > 0) {
                result(null, rows);
                return;
            }
            result(null, { message: "Vendedor não encontrado com o id: " + id });
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
                itens.push("`" + item + "` = ? ");
                conteudo.push(vendedor[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE vendedores SET " + campos + " WHERE id = ?";

            const rows = await conn.query(query, [...conteudo, id]);


            if (rows.affectedRows == 0) {
                result({ message: "Vendedor não encontrado" }, null);
                return;
            }

            result(null, { id: id, message: "Vendedor alterado com sucesso!!!", ...vendedor });

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

Vendedor.remove = (id, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`DELETE FROM vendedores WHERE id = ?`, id);
            if (rows.affectedRows == 0) {
                result({ message: "Vendedor não encontrado" }, null);
                return;
            }
            result(null, { message: "Vendedor deletado com sucesso!!" });
        } catch (err) {

            result(err, null);
            return;
        }
    })
};


module.exports = Vendedor;

