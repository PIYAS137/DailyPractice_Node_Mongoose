import { NextFunction,Request,Response } from "express";
import { AnyZodObject } from "zod";



const Zod_Validation_Request=(schema:AnyZodObject)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        console.log(req.body);
        try{
            await schema.parseAsync({
                body : req.body,
                cookie : req.cookies,
            })
            next()
        }catch(error){
            next(error);
        }
    }
}


export default Zod_Validation_Request
