const sql = require("../../config/db").getConnection();
const crypt = require('../../utils/crypt');
const jwt = require('jsonwebtoken');

// constructor
const Login = function (vendedor) {
    this.email = vendedor.email;
    this.senha = vendedor.senha;
};



Login.getLogin = (vendedor, result) => {
    sql.then(async function (conn) {
        try {
            const rows = await conn.query(`SELECT * FROM vendedores  WHERE email = ?`, vendedor.email);
            if (rows.length > 0) {

                var conj = crypt.login(vendedor.senha, rows[0].salt, rows[0].senha);

                if (conj.login === true) {

                    const query = "SELECT * FROM vendedores WHERE email = ? and senha = ? ";
                    const rows2 = await conn.query(query, [vendedor.email, conj.hash]);



                    if (rows2.length) {

                        const id = rows2[0].id;
                        const token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: 600
                        });
                        result(null, { message: "Usuario Logado! ", auth: true, token: token, nome: rows2[0].nome, email: rows2[0].email });


                    }


                } else {
                    return result({ message: "Email e Senha não conferem!!" }, null);
                }
            } else {
                result({ message: "Email não cadastrado!!" }, null);
            }

        } catch (err) {

            result(err, null);
            return;
        }
    })
};



module.exports = Login;

