const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3

    },
    phonenumber: {
        type: String,
       // required: true,
        unique: true,
        minLength: 10,
        maxLength: 15
    }
})

usersSchema.pre('save', async function (next) {

    // console.log(this);

    var salt = await bcrypt.genSalt(10)
    var hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})


const usersModel = mongoose.model('User', usersSchema)

module.exports = usersModel