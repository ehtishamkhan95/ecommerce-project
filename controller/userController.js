import {createUserRecord, listAllUsers, searchUserById, updateUserById, deleteRecordById} from "../services/userServices.js"

//user register
export const createUser = async(req, res) => {
    try{
        const newUser = await createUserRecord(req,res)
        res.status(201).json(newUser)

    } catch(error){
        res.status(500).json({message: error.message})
    }
};


//get all record
export const getAllUsers = async(req, res) => {
    try{
        const users = await listAllUsers();
        if(users){
            res.status(200).json(users)
        }
    } catch (error){
            res.status(500).json({message: error.message})
    }
}

// find single record
export const getSingleUser = async (req, res) => {
    try {
        const user = await searchUserById(req)
        if(user){
            res.status(200).json(user)
            console.log(user._id)
        }

    } catch (error){
            res.status(404).json({message: error.message})
    }
}

// update single record
export const updateSingleUser = async (req, res) => {
    try {
        const user = await updateUserById(req)
        if(user){
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

//delete single record
export const deleteSingleUser = async(req, res) => {
    try {
        const user = await deleteRecordById(req)
        if (user){
            res.status(204).json({message: "Successfully deleted user"})
        }
    } catch (error){
        res.status(404).json({message: error.message})
    }
}