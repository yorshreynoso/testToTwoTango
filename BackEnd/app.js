const express   = require('express');
const app       = express();
const routes    = require('./routes/authController.js');
const cors      = require("cors");
require('./database');

const port = process.env.PORT || 3000;
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false})); // user to server
// parse application/json
app.use(express.json()); //server to user

//process password(process.env)
require('dotenv').config();


//main route
app.use('/api/', routes);

app.use((req, res) => {
    console.log(req.url);
    return res.status(400).json({message: "The url is incorrect"});
});

//server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});