
const express = require("express");
const mongoose=require('mongoose')
const cors=require('cors')
const productsRoutes=require("./routes/products")
const usersRoutes=require("./routes/users");
const port = 3333 || process.env.PORT ;
var app = express()
const uri = process.env.MONGOURI;

app.use(cors())
//middleware   >>
app.use(express.json())
app.set('view engine', 'pug')

app.use('/products',productsRoutes)
app.use('/users',usersRoutes)

//not found middleware
app.use("*",function(req, res, next){

    res.status(404).json({message:"not found okk"})
})

//error handling middleware
app.use(function(err,req,res,next){

    res.status(500).json({message:err.message})

})

//custom middleware
app.use(function(req,res,next){
   console.log(req.url);
   req.x=10
     next()
})

//serve static files
app.use(express.static('./static'))




mongoose.connect(uri,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("connected to DB successfully");
}).catch((err)=>{
    console.log(err);
})

app.listen(port, () => {

    console.log("server listening on port 3333");
})

