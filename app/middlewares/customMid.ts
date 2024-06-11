import { NextFunction,Request,Response} from "express";


const myMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    console.log("WOW HTI");
    next();
}

export const middlewares = {
    myMiddleware,
}