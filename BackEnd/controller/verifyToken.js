const jwt = require('jsonwebtoken');

//process password
require('dotenv').config();
const PASSWORD_JWT = process.env.SECRET_PASSWORD;


//middleware, to verify if we have access or not
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader) {
        const token = bearerHeader.split(" ")[1]; //get token array 1
        
        jwt.verify(token, PASSWORD_JWT, async(error, authData) => { // validate token
            if(error) {
                return res.status(401).json({
                    auth    : false,
                    message : "Validation token error"
                });
            }
            req.userId = await authData.id;
            next(); // continue de process
        });
    } else {
        return res.status(401).json({
            auth    : false,
            message : "No token provided"
        });
    }
}


module.exports = verifyToken;