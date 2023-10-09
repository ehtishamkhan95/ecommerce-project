import express from "express";
import {newCart, addItemsToCart, getCartContents, removeItemsFromCart, updateCart} from "../controller/cartController.js";

const router = express.Router();


router.post("/cart", newCart)
router.post("/cart/add-item", addItemsToCart)
router.get("/cart", getCartContents)
router.put("/cart/update-quatnity/:productId", updateCart)
router.delete("/cart/remove-item/:productId", removeItemsFromCart)

export {router}