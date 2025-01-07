const usersModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const getAllUsers = (req, res) => {

    res.json({ message: "all users" })
}


const saveUser = async (req, res) => {

    var user = req.body
   // console.log(user);
    

    try {
        var user = await usersModel.create(user)
        res.status(201).json({ data: user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }


}


async function login(req, res) {
    const { phonenumber, password } = req.body

    if (!phonenumber || !password) {
        return res.status(400).json({ message: "you must provide phone number and password to login" })
    }

    const user = await usersModel.findOne({ phonenumber: phonenumber })
    if (!user) {
        return res.status(404).json({ message: "invalid phone number or password" })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return res.status(401).json({ message: "invalid email or password" })
    }
    //  process.env
    //generate token 
    const token = jwt.sign({ id: user._id, name: user.userName },
         process.env.SECRET,
          { expiresIn: '1h' })

    res.status(200).json({ token: token })


}

module.exports = { getAllUsers, saveUser, login }