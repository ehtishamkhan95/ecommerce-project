import express from "express";

import {registerUser, login, getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser,
updatePassword, forgetPassowrdOTP, verifyOtp} from "../controller/userController.js";

import {createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct} from "../controller/productController.js";

import {createCart, addProductToCart, deleteCartProduct, getCartContents} from "../controller/cartController.js";

import {createOrder, orderStatusUpdate, getUserOrders} from '../controller/orderController.js'

import {verifyToken} from '../middlewares/middelwares.js'

const router = express.Router();

//User Routes
router.post("/user/register", registerUser)
router.post("/user/login", login)
router.get("/user/all", getAllUsers)
router.get("/user", verifyToken, getSingleUser)
router.put("/user", verifyToken, updateSingleUser)
router.delete("/user", verifyToken, deleteSingleUser)
router.post("/user/update-password", updatePassword)
router.post("/user/forget-password", forgetPassowrdOTP)
router.put("/user/reset-password", verifyOtp)

//Product Routes
router.post("/products", createProduct)
router.get("/products", getAllProducts)
router.get("/products/:id", getSingleProduct)
router.put("/products/:id", updateSingleProduct)
router.delete("/products/:id", deleteSingleProduct)

//Cart Routes
router.post("/cart", verifyToken, createCart)
router.put("/cart", verifyToken, addProductToCart)
router.delete("/cart", verifyToken, deleteCartProduct)
router.get("/cart", verifyToken, getCartContents)

//Order Routes
router.post("/orders", verifyToken, createOrder)
router.put("/orders/:orderId", orderStatusUpdate)
router.get("/orders", verifyToken, getUserOrders)

export {router}
