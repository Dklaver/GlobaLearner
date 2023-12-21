const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        try {
            // Check if the Authorization header is present
            if (!req.headers['authorization']) {
                throw createError.Unauthorized('Authorization header is missing');
            }

            // Extract and verify the token
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const token = bearerToken[1];

            JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
                if (err) {
                    // Token verification failed
                    if (err.name === 'JsonWebTokenError') {
                        throw createError.Unauthorized('Invalid token');
                    } else if (err.name === 'TokenExpiredError') {
                        throw createError.Unauthorized('Token has expired');
                    } else {
                        throw createError.InternalServerError('Internal server error during token verification');
                    }
                }

                // Token is valid, store the payload in the request object
                req.payload = payload;
                next();
            });
        } catch (err) {
            // Handle any synchronous errors that occur during verification
            console.error('Error during token verification:', err);

            // Pass the error to the error handling middleware
            next(err);
        }
    },
    GetUserId: (req, res, next) => {
        
        if (!req.headers['authorization']) {
            throw createError.Unauthorized('Authorization header is missing');
        }
        
        const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const token = bearerToken[1];
        console.log("token: " + token)
        if (token) {
            JWT.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (err) {
                    // Token verification failed
                    if (err) {
                        console.log(err)
                        next();
                    }
                }
                else {
                    const userId = payload.id;
                    req.userId = userId
                    next();
                }
            }
            )
        
        }else {
            next();
            throw createError.Unauthorized('no token found')
        }
    }
};