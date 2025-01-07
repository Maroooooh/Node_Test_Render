const jwt = require('jsonwebtoken')
const { promisify } = require('util')

async function auth(req, res, next) {

    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ message: "please login first" })
    }

    try {
      var decoded=await promisify(jwt.verify)(token, process.env.SECRET)
        req.id=decoded.id
      
        next()
    } catch (err) {
        res.status(401).json({ message: "please login first" })
    }

}

module.exports={auth}