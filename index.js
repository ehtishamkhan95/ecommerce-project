import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {router as userRouter} from "./routes/userRoutes.js";
import {router as productRouter} from "./routes/productRoutes.js";
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(bodyParser.json())
app.use("/api", userRouter);
app.use("/api", productRouter);

mongoose.connect(process.env.CN_MDB)
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>{
    console.log("Database failed to connect....")
    console.log(error)
})

//mongoose.connection.on("connected", ()=>{
 //   console.log("Database Connected")
//})

app.listen(process.env.PORT, () =>{
    console.log(`Server is working on port: ${process.env.PORT}`)
})