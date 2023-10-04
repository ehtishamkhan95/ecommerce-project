import User from "../models/user.model.js"

//create user function
export const createUser = async(req, res) => {
    try{
        const {username, email, password, isAdmin, userPicUrl, phone,
            address, firstName, lastName} = req.body;
        if (!username || !email || !password || !isAdmin || !firstName || !lastName){
            res.status(400).json({message:"Please fill all required fields."})
        }

        const newUser = new User({
            username,
            email,
            password,
            isAdmin,
            userPicUrl,
            phone,
            address,
            firstName,
            lastName,
        })
        await newUser.save()
        res.status(200).json(newUser)

    } catch(error){
        res.status(400).json({message:"Error: User couldn't be created."})
        console.log(error)
    }
};

//get all data
export const getAllUsers = async(req, res) => {
    try{
        const users = await User.find();
        if(users){
            res.status(200).json(users)
        }
    } catch (error){
            res.status(500).json({message: "Error: Couldn't GET users data"})
    }
}

// find by param
export const getSingularUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById({id:id});
        if(user){
            res.status(200).json(user)
        }

    } catch (error){
            res.status(404).json({message:"Error: User not found"})
    }
}

// update single user
export const updateSingleUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body,{
            new:true
        })
        if(user){
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(404).json({message: "Error: Couldn't update, user not found"})
    }
}

//delete single record
export const deleteSingleUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id)
        if (user){
            res.status(200).json({message: "Successfully deleted user"})
        }
    } catch (error){
        res.status(404).json({message: "Error: Couldn't delete. User not found"})
    }
}