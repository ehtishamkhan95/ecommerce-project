import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export async function createUserRecord (req, res) {
   const {username, email, password, isAdmin, userPicUrl, phone,
      address, firstName, lastName} = req.body;

   if (!username || !password || !email || !firstName || !lastName){
      return res.status(400).send("Please fill required fields");
   }

   const userExists = await User.findOne({username});
   const emailExists = await User.findOne({email});

   if(userExists){
      return res.status(409).json({message:"Username is taken, try another"});
   }
   if(emailExists){
      return res.status(409).json({message:"Email is already in use, try another"});
   }

   const encryptPassword = await bcrypt.hash(password, 10);
     
   const newUser = new User({username,email,password:encryptPassword,isAdmin,userPicUrl,phone,address,firstName,lastName,});

   
   await newUser.save();
   return newUser;
}


export async function listAllUsers(){
   return await User.find();
}

export async function searchUserById(req){
   const {id} = req.params;
   return await User.findById(id);
}

export async function updateUserById (req) {
   const {id} = req.params;
   return await User.findByIdAndUpdate(id, req.body,{new:true})
}

export async function deleteRecordById (req) {
   const {id} = req.params;
   return await User.findByIdAndDelete(id)
}