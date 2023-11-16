import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {router} from "./routes/routes.js";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use("/api", router);

mongoose.connect(process.env.CN_MDB)

mongoose.connection.on("connected", ()=>{
  console.log("Database Connected")
});

app.listen(process.env.PORT, () =>{
    console.log(`Server is working on port: ${process.env.PORT}`)
});