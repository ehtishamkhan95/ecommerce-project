import Product from "../models/productModel.js"
import User from "../models/userModel.js"
import Cart from "../models/cartModel.js"

export async function createCart(req, res){
    const {userId} = req.body;
    const existingCart = await Cart.findOne({userId});
    const userIdCheck = await User.findById(userId)

    if (!userIdCheck){
        return res.status(404).json({message: "User doesn't exist"});
    }

    if(existingCart){
        return res.status(400).json({message: 'A cart already exists for this user'});
    }

    const newCart = new Cart({userId, items:[]});
    await newCart.save();
    return newCart;
}

export async function addToCart(req,res){
    const {userId} = req.body
    const newQuantity = req.body.quantity
    const newProductId = req.body.productId
    const productIdCheck = await Product.findById(newProductId)

    if (!productIdCheck){
        return res.status(404).json({message: "Product doesn't exist"});
    }
    const cart = await Cart.findOne({userId});
    const existingItems = await Cart.findOne({userId, 'item.productId':newProductId})
    if (existingItems){
        cart.item.quantity += newQuantity
    } else {
        cart.item.push({productId:newProductId, quantity: newQuantity})
    }

    await cart.save();
    return cart
}

export async function updateItems(req){
    const {productId} = req.params
    const {userId} = req.body;
    const newQuantity = req.body.quantity
    
    const cart = await Cart.findOne({userId});
    const itemToUpdate  = cart.item.find((item) => item.productId.toString() === productId);
    if (itemToUpdate ){
        itemToUpdate.quantity += newQuantity
    }

    await cart.save();
    return cart;
}

export async function getCart (req){
    const newUserId = req.body.userId
    const cart = await Cart.findOne({userId:newUserId});
    return cart
}

export async function removeCartItems(req){
    const productId = req.params.productId
    const {userId} = req.body;
    const newQuantity = req.body.quantity
    
    const cart = await Cart.findOne({userId});
    const itemToUpdate  = cart.item.find((item) => item.productId.toString() === productId);
    if (itemToUpdate ){
        itemToUpdate.quantity -= newQuantity
    }

    await cart.save();
    return cart;
}