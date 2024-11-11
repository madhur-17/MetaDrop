import {Response, Router,Request} from "express";


const router=Router();

router.get("/signin",(req:Request,res:Response)=>{
    res.json({message:"Hello"})
})

router.get("/signup",(req,res)=>{
    res.json({message:"World"})
})


export default router;