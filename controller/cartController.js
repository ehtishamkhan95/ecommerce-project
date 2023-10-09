import {createCart, addToCart, updateItems, getCart, removeCartItems} from "../services/cartServices.js"

// create cart
export const newCart = async (req, res) => {
    try {
        const newCart = await createCart(req,res);
        res.status(201).json({ message: 'Cart created successfully', newCart });
        }
     catch (error) {
        res.status(500).json({ message: 'Failed to create cart', error: error.message });    }
}

//add cart items
export const addItemsToCart = async(req,res)=>{
    try{
        const cart = await addToCart(req,resizeTo);
        res.status(200).json({ message: 'Item added to cart successfully', cart});
    } catch(error){
        res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
    }
}

//update cart items
export const updateCart = async (req, res) => {
    try{
        const cart = await updateItems(req,res);
        res.status(200).json({ message: 'Item quantity updated successfully', cart});
    }catch (error){
        res.status(500).json({ message: 'Failed to update item quantity in cart', error: error.message });
    }
}

//get cart
export const getCartContents = async (req,res) => {
    try{
        const cart = await getCart(req);
        res.status(200).json(cart);
    } catch (error){
        res.status(500).json({ message: 'Failed to retrieve cart', error: error.message });
    }
}

//remove cart items
export const removeItemsFromCart = async (req, res) => {
    try{
        const cart = await removeCartItems(req);
        res.status(200).json({ message: 'Item removed successfully', cart});
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item in cart', error: error.message });
    }
}