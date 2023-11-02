import Cart from "../models/cartModel.js"
import User from "../models/userModel.js"
import Product from "../models/productModel.js"

//create cart
export const createCart = async (req,res) => {
    try{
        const {userId} = req.user;
        console.log(req.user)

        let user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({message: "User doesn't exist"})
        }

        let cart = await Cart.findOne({userId});

        if (!cart) {
            cart = new Cart({userId, items:[]});
            await cart.save();
        } else {
            return res.status(400).json({message:"Cart already exists for user."})
        }
    
        res.status(200).json({message: "Cart created successfully.", cart})

    } catch (error) {
        res.status(400).json(error.message)
    }
}

//add cart product
export const addProductToCart = async (req,res)=>{
    try{
        const {productId, quantity} = req.body;
        const {userId} = req.user
    
        const product = await Product.findById(productId);

        if (!product){
            return res.status(404).json({message: "Product doesn't exist"});
        }
        
        let cart = await Cart.findOne({userId});

        const existingProduct = cart.items.find((item) => item.productId.toString() === productId);

        if (existingProduct){
            existingProduct.quantity = quantity;
            existingProduct.totalPrice = quantity*product.price;
        } else {
            cart.items.push({productId, quantity, totalPrice: quantity*product.price})
        }

        let totalCartPrice=0;
        for(let i=0; i < cart.items.length; i++){
            totalCartPrice += cart.items[i].totalPrice;
        }
        cart.totalCartPrice = totalCartPrice;

        await cart.save();
        res.status(200).json({ message: 'Cart updated.', cart});

    } catch(error){
        res.status(500).json(error.message);
    }
}

//delete cart product
export const deleteCartProduct = async (req,res) => {
    try{
        const {productId} = req.body;
        const {userId} = req.user;

        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json({message: "Cart for user doesn't exist"})
        }

        const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (productIndex === -1){
            return res.status(404).json({ message: 'Product is not in the cart' });
        }

        console.log(productIndex)

        cart.items.splice(productIndex, 1)
        
        let totalCartPrice=0;
        for(let i=0; i < cart.items.length; i++){
            totalCartPrice += cart.items[i].totalPrice;
        }
        cart.totalCartPrice = totalCartPrice;

        await cart.save();

        res.status(200).json({message: "Product deleted from cart successfully.", cart})

    } catch (error){
        res.status(400).json(error.message)
    }
}

//get cart
export const getCartContents = async (req,res) => {
    try{
        const {userId} = req.user;
        let page = req.query.page;
        let pageLimit = req.query.limit
        const cart = await Cart.findOne({userId})
        .populate('userId', 'username email firstName lastName')
        .populate('items.productId', 'title price productPicUrl')
        .skip((page-1)*pageLimit)
        .limit(pageLimit);

        if (!cart) {
            return res.status(404).json({message: "Cart doesn't exist for the user."})
        }
        
        res.status(200).json(cart);

    } catch (error){
        res.status(500).json(error.message);
    }
}