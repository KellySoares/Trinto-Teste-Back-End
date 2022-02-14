const mariadb = require("mariadb");
const config = require("./db.config");

const pool = mariadb.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB
});

module.exports = {
    getConnection() {
        return new Promise(function (res, rej) {
            pool.getConnection()
                .then(function (conn) {
                    res(conn);
                })
                .catch(function (error) {
                    rej(error);
                });
        });
    }
}