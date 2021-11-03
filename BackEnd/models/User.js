const {Schema, model}   = require('mongoose');
const bcrypt            = require('bcryptjs');


const userSchema = new Schema({
    email   : String,
    password: String
});

//encrypt password
userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt()  //default 10 rounds.  asyncrono
    return bcrypt.hash(password, salt);
}

//validate encrypted password
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password); // return true or false
}

module.exports = model('User', userSchema);

