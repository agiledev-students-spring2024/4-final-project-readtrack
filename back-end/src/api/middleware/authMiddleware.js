const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader: ', authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing." });
    }

    const token = authHeader.split(' ')[1];
    console.log('token in authenticateToken: ', token)
    if (!token) {
        return res.status(401).json({ message: "Bearer token not found." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            const message =
                err.name === "JsonWebTokenError" ? "Unauthorized: Invalid token" :
                    err.name === "TokenExpiredError" ? "Unauthorized: Token has expired" :
                        "Unauthorized: Token verification failed";
            return res.status(403).json({ message });
        }

        req.user = decodedToken;
        next();
    });
};
