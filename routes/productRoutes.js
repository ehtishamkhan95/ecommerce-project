import express from "express";
import {createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct} from "../controller/productController.js";

const router = express.Router();

router.post("/products", createProduct)
router.get("/products", getAllProducts)
router.get("/products/:id", getSingleProduct)
router.put("/products/:id", updateSingleProduct)
router.delete("/products/:id", deleteSingleProduct)

export {router}
