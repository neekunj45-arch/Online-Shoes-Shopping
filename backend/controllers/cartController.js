import userModel from '../models/userModel.js'

// add product to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})   
    }
}

// remove from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        const itemId = req.body.itemId;

        if (cartData[itemId]>0) {
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
              }
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

// fetch user cart details
const getCart = async (req,res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export {addToCart, removeFromCart, getCart}
