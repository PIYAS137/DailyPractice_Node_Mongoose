import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import Final_App_Error from "./FinalAppError";
import { DuplicateKeyError, Error_Type, HandleZodError, MongooseCastError, MongooseValidatorError } from "../utils/ErrorFormatHandler";


const Global_Error_Handler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let errorTitle = 'There is an server side error !';
    let errorSource:Error_Type=[{
        path : '',
        message : "There is an server side error"
    }] 
    let statusCode = err.statusCode|500;



    if(err instanceof ZodError){
        const gettedFormat = HandleZodError(err);
        errorTitle = gettedFormat.ErrorMessage;
        errorSource = gettedFormat.ErrorSource;
    }else if(err.name==="ValidationError"){
        const gettedFormat = MongooseValidatorError(err);
        errorTitle = gettedFormat.ErrorMessage;
        errorSource = gettedFormat.ErrorSource;
    }else if(err.name==="CastError"){
        const gettedFormat = MongooseCastError(err);
        errorTitle = gettedFormat.ErrorMessage;
        errorSource = gettedFormat.ErrorSource;
    }else if(err.code === 11000){
        const gettedFormat = DuplicateKeyError(err);
        errorTitle = gettedFormat.ErrorMessage;
        errorSource = gettedFormat.ErrorSource;
    }else if(err instanceof Final_App_Error){
        errorTitle = err.message;
        errorSource = [{
            path : '',
            message : err.message
        }]
    }else if(err instanceof Error){
        errorTitle= err.message;
        errorSource =[{
            path : '',
            message : err.message
        }]
    }


    return res.status(statusCode).json({
        success:false,
        errorTitle : errorTitle,
        errorSource: errorSource,
        stack:err.stack,
        // myErrorrrrr:err
    })
}

export default Global_Error_Handler;