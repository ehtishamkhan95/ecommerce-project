import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import {router} from "./routes/routes.js";

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.use("/api", router);

mongoose.connect(process.env.CN_MDB)

mongoose.connection.on("connected", ()=>{
  console.log("Database Connected")
})

app.listen(process.env.PORT, () =>{
    console.log(`Server is working on port: ${process.env.PORT}`)
})