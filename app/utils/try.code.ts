import { NextFunction, RequestHandler,Request,Response } from "express";


const asyncCatch=(fn:RequestHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve(fn(req,res,next)).catch(err=>next(err))
    }
}



export default asyncCatch;
