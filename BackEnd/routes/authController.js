const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const User      = require('../models/User');
const verifyToken = require('../controller/verifyToken');

//process password
require('dotenv').config();

const PASSWORD_JWT = process.env.SECRET_PASSWORD;


router.get('/', (req, res) => {
    console.log(__dirname);
    res.status(200);
    res.end();
});

router.post('/createUser', async(req, res) => { //login, new users
    const { email, password } = req.body;
    
    const user = new User({email, password});

    user.password = await user.encryptPassword(user.password); //asyncronous.  encrypt our password and then overwrite original password
    await user.save(); //save user on mongodb
    
    //create token on jwt
    jwt.sign({id: user._id}, PASSWORD_JWT, {expiresIn : '1h' }, (err, token) => {
        if(!err && token) {
            console.log('created correctly');
            return res.json({
                auth: true,
                token
            });
        } else {
            res.err({ message:"Error to get token" });
        }
    });
    return res;
});

router.post('/loginUser', async(req,res) => {
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
//just for testing purposse, to validate if we have loggued correctly.
router.post('/protected', verifyToken, async (req, res) => {
    const authDataId = req.userId;
   
    const user = await User.findById(authDataId, { password: 0 }); // get by id and dont get password
    if(!user) {
        return res.status(404).send({ message:"user doesn't found"});
    }
    return res.json(user);


});

router.get('/users', verifyToken, async(req, res) => {
    let newUsers = [];
    //const authDataId = req.userId;
    const users = await User.find();
    if(users) {
        for(user of users) {
            newUsers.push({id:user._id,  email: user.email});
        }
        return res.json(newUsers);
    }
    return res.status(404).send('There is no users on database');
})



module.exports = router;