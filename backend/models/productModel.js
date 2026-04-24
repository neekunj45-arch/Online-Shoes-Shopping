import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number,required:true},
    description: {type:String, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},
})

//  for not create again and again created model 
const ProductModel = mongoose.model.product || mongoose.model("product" , productSchema);

export default ProductModel;