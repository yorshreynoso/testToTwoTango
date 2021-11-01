const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const User      = require('../models/User');

//process password
require('dotenv').config();

const PASSWORD_JWT = process.env.SECRET_PASSWORD;


router.get('/', (req, res) => {
    console.log(__dirname);
    res.status(200);
    res.end();
});

router.post('/signup', async(req, res) => { //login, new users
    const { email, password } = req.body;
    
    const user = new User({email, password});

    user.password = await user.encryptPassword(user.password); //asyncronous.  encrypt our password and then overwrite original password
    await user.save(); //save user on mongodb
    
    //create token on jwt
    jwt.sign({id: user._id}, PASSWORD_JWT, {expiresIn : '1h' }, (err, token) => {
        
        if(!err && token) {
            res.json({
                auth: true,
                token
            });
        } else {
            res.err({ message:"Error to get token" });
        }
    });
});

router.post('/signin', async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            //create token
            jwt.sign({id: user._id}, PASSWORD_JWT, {expiresIn : '23h' }, (err, token) => {
                if(!err && token) {
                    res.json({
                        auth: true,
                        token
                    });
                } else {
                    res.err({ message:"Error to get token" });
                }
            });
            
        } else {
            res.status(401).json({auth:false, token: null});
        }
    } else {
        res.status(404).send(`user ${email} doesn't exist`);
    }

});

//only logged users can entry into this route, only logged correctly
router.post('/protected', (req, res) => {
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader) {
        const token   = bearerHeader.split(" ")[1];
        
        jwt.verify(token, PASSWORD_JWT, async(error, authData) => { // validate token
            if(error) {
                res.status(401).json({
                    auth    : false,
                    message : "Validation token error"
                });
            } else {
                const user = await User.findById(authData.id, { password: 0 }); // get by id and dont get password
                if(!user) {
                    return res.status(404).send({ message:"user doesn't found"});
                }
                return res.json(user);
            }
        });

    } else {
        res.status(403).json({
            auth    : false,
            message : "No token provided"
        });
    }

});



module.exports = router;