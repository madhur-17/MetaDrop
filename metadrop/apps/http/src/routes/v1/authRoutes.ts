import {Response, Router,Request} from "express";
import { SignInSchema, SignUpSchema } from "../../types";
import client from "@repo/db/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=Router();

router.post("/signin",async(req:Request,res:Response)=>{
        const data=SignInSchema.safeParse(req.body);
        if(!data.success){
            res.status(403).json({message:"ValidationFailed"})
            return;
        }
        try{
            const user=await client.user.findUnique({
                where:{
                    username:data.data.username
                }
            })
            if(!user){
                res.status(403);
                return;
            }
            const isValid=await bcrypt.compare(data.data.password,user.password);
            if(!isValid){
                res.status(403);
                return;
            }
            const token=jwt.sign({userId:user.id,role:user.role},"mysecret")
            res.status(200).json({
                token
            })


        }
        catch(e){
            res.status(400).json({
                success:false,
                message:"Error while Signing"

            })
        }

})

router.post("/signup",async(req,res)=>{
    const pdata=SignUpSchema.safeParse(req.body);
    if(!pdata.success){
        res.status(400).json({message:"ValidationFailed"})
        return
    }
    try{
        const hashPasssword=await bcrypt.hash(pdata.data.password,10)
        const user=await client.user.create({
            data:{
                username:pdata.data.username,
                password:hashPasssword,
                role:pdata.data.type=="admin"?"Admin":"User"

            }
        })
        res.status(200).json({
            userId:user.id
        })
}
    catch(e){
            res.status(400).json({success:false,message:"Error while signup"})
    }
})


export default router;