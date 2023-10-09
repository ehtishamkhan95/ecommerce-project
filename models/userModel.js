import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:   {type: String, unique: true, required: true},
    email:      {type: String, unique: true, required: true},
    password:   {type: String, required: true},
    isAdmin:    {type: Boolean, require: true},
    userPicUrl: {type: String,},
    phone:      {type: Number},
    address:    {type: String},
    firstName:  {type: String, required: true},
    lastName:   {type: String, required: true},
})

const schema = mongoose.model("users", userSchema);
export default schema