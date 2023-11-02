import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title:          {type: String, unique: true, required: true},
    description:    {type: String, required: true},
    price:          {type: Number, required: true},
    category:       {type: String, require: true},
    productPicUrl:  {type: String}
})

const schema = mongoose.model("products", productSchema);
export default schema