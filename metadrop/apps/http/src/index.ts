import express from "express";
import v1Router from "./routes/v1/index"


const app=express();
app.use(express.json());



app.use("/api/v1",v1Router);


app.listen(3000,()=>{
    console.log("Server Started");
});