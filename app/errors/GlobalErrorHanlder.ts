import { NextFunction,Request,Response } from "express"


const Global_Error_Handler = (error:any,req:Request,res:Response,next:NextFunction)=>{
    if(error){
        console.log(error);
        res.status(error.statusCode || 500).json({
            success : false,
            message : error.message || "There is an server side error !",
            error
        })
    }
}


export default Global_Error_Handler;