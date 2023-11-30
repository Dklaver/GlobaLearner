const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return (createError.Unauthorized());
        console.log("HEADER: " + req.headers['authorization']);
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];

        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized());
            }
            req.payload = payload;
            next();
        })
    }
}