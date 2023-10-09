import {createProductRecord, listAllProducts, searchProductById, updateProductById, deleteProductById} from "../services/productServices.js"

//create Product
export const createProduct = async(req, res) => {
    try{
        const newProduct = await createProductRecord(req)
        res.status(201).json(newProduct)

    } catch(error){
        res.status(500).json({message: error.message})
    }
};

//get all data
export const getAllProducts = async(req, res) => {
    try{
        const products = await listAllProducts();
        if(products){
            res.status(200).json(products)
        }
    } catch (error){
            res.status(500).json({message: "Error: Couldn't GET products data"})
    }
}

// find by param
export const getSingleProduct = async (req, res) => {
    try {
        const product = await searchProductById(req)
        if(product){
            res.status(200).json(product)
        }

    } catch (error){
            res.status(404).json({message:"Error: product not found"})
    }
}

// update single product
export const updateSingleProduct = async (req, res) => {
    try {
        const product = await updateProductById(req)
        if(product){
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

//delete single product
export const deleteSingleProduct = async(req, res) => {
    try {
        const product = await deleteProductById(req)
        if (product){
            res.status(204).json({message: "Successfully deleted product"})
        }
    } catch (error){
        res.status(404).json({message: "Error: Couldn't delete. Product not found"})
    }
}