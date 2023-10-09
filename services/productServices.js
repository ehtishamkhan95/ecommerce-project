import Product from "../models/productModel.js"

export async function createProductRecord(req) {
    const {title, description, price, category, productPicUrl} = req.body;
    if (!title || !description || !price || !category){
        res.status(400).json({message:"Please fill all required fields."})
    }
    const newProduct = new Product({title,description,price,category,productPicUrl})
    await newProduct.save()
    return newProduct
}

export async function listAllProducts(){
   return await Product.find();
}

export async function searchProductById(req){
   const {id} = req.params;
   return await Product.findById(id);
}

export async function updateProductById (req) {
   const {id} = req.params;
   return await Product.findByIdAndUpdate(id, req.body,{new:true})
}

export async function deleteProductById (req) {
   const {id} = req.params;
   return await Product.findByIdAndDelete(id)
}