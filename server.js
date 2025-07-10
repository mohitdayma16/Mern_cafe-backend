import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes.js"
const app = express();
app.use(cors());
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose.connect(`mongodb+srv://mohitdayma164:gcRtBaG746ycpwOG@cluster0.mosbnju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    app.listen(8080,()=>{
        console.log("server started");
        
    });
});

app.use("/api/user",userRouter);

//server