const express=require('express')
var router=express.Router()
const {getAllUsers,saveUser,login}=require('../controllers/users')


//get all users 
router.get('/',getAllUsers)
router.post('/',saveUser)
router.post('/login',login)

module.exports=router
