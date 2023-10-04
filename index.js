import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {router} from "./routes/user.routes.js";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(bodyParser.json())
app.use("/api", router);

mongoose.connect(process.env.CN_MDB)

mongoose.connection.on("connected", ()=>{
    console.log("Database Connected")
})

app.listen(process.env.PORT, () =>{
    console.log(`Server is working on port: ${process.env.PORT}`)
})