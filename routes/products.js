const express=require('express')
var router=express.Router();
var {createCategory , addProduct , getproductbycategory , deleteproduct , editproduct 
  ,getallcategory , getallproducts , getproductbyid
}=require('../controllers/products')
const {auth}=require('../middlewares/auth')
const {storage} = require('../utils/cloudinary');

const multer=require('multer')
const path = require('path');
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.jpeg', '.png', '.jpg','.gif','.bmp','.tiff','.mov','.wmv','.flv','.webm','.webp','.mp4']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only images and Videos'), false);
    }
    
    cb(null, true);
  };
const upload = multer({ storage, fileFilter});
router.post('/category',createCategory)

router.post('/product', upload.single('img'), addProduct);

router.get('/products/:categoryId',getproductbycategory)

router.delete('/product/:productId',deleteproduct)

router.put('/product/:productId',upload.single('img'),editproduct)

router.get('/categories', getallcategory)
router.get('/products' , getallproducts )
router.get('/product/:pId', getproductbyid)
module.exports=router