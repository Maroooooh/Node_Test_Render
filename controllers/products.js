const {
    Category,
    Product
} = require('../models/products');

const createCategory = async (req, res) => {
    const cat = req.body
    try {
        const savedCategory = Category.create(cat)
        res.status(201).json({
            data: cat
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};

const addProduct = async (req, res) => {
    try {
        // Extract data from form submission
        const {
            name,
            price,
            description,
            inStock,
            categoryId
        } = req.body;
       // console.log('I am marah')
        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }

        // Ensure the image file exists
        const imgPath = req.file && req.file.path; // Using single file upload
        if (!imgPath) {
            return res.status(400).json({
                message: 'Image is required'
            });
        }

        // Create a new product
        const newProduct = new Product({
            name: name,
            price: parseFloat(price), // Convert price to a number
            description: description || '', // Default to empty string if description is not provided
            inStock: inStock === 'true', // Convert inStock to a boolean
            categoryId: categoryId,
            img: imgPath, // Image file path
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Respond with the created product
        res.status(201).json({
            data: savedProduct
        });
    } catch (err) {
        // Handle errors and respond with a 400 status code
        res.status(400).json({
            message: err.message
        });
    }
};
const getproductbycategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const products = await Product.find({
            categoryId
        }).populate('categoryId');
        res.status(200).json({
            data: products
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }

}
const deleteproduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(204).json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}

const editproduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true
        });
        res.status(200).json({
            data: updatedProduct
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
 
}
const getallcategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}
const getallproducts =async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            data: products
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}

const getproductbyid=async (req, res) => {
    const productId = req.params.pId;
    try {
        const product = await Product.findById(productId).populate('categoryId');
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.status(200).json({
            data: product
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}
module.exports = {
    createCategory,
    addProduct,
    getproductbycategory,
    deleteproduct ,
    editproduct , 
    getallcategory ,
    getallproducts  , 
    getproductbyid
}