import productModel from '../models/productModel.js'
import fs from 'fs'


// add product item

const addProduct = async (req,res) => {

    let image_filename = `${req.file?req.file.filename:""}`;

    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename
    })

    try {
        await product.save();
        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// all product list

const listProduct = async (req,res) => {

    try {
        const products = await productModel.find({});
        res.json({success:true,data:products})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// update product

const updateProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id);

        if(!product) {
            return res.json({success: false, message:"product not found"})
        }

        // image upload 
        if (req.file) {
            // old image delete
            if(product.image) {
                fs.unlink(`uploads/${product.image}`,()=>{})
            }
            product.image = req.file.filename;
        }

        // update input fields
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category;

        await product.save();

        res.json({success: true, message: "product updated."})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove product

const removeProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`,()=>{})

        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addProduct,listProduct,removeProduct, updateProduct};