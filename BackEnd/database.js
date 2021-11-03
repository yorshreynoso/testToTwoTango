const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE, {
    usenewUrlParser: true
})
.then(() => console.log('Database is connected'))
.catch(e => console.log('Error connecting to database', e));




module.exports = mongoose;