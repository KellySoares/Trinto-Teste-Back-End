const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

module.exports = {
  verifyJWT(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'É necessário realizar login para acessar essa página.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Falha ao autenticar token. Realize o login novamente.' });

      req.userId = decoded.id;
      next();
    });

  }
};