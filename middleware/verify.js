const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).send({ auth: false, message: 'Token tidak disediakan.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifikasi token:', err);
            return res.status(401).send({ auth: false, message: 'Token tidak valid.' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
