import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";

type Error_Type = {
    path: string | number,
    message: string
}[]

const Global_Error_Handler = (error: any, req: Request, res: Response, next: NextFunction) => {


    let errorTitle = error.message || "There is an server side error *";
    let errorSource: Error_Type = [
        {
            path: '',
            message: 'There is an server side error *'
        }
    ]

    const Zod_Error_Handler = (error: ZodError) => {
        const zodErrorTitle = "Zod Validation Error *";
        const errorSource: Error_Type = error.issues.map((one: ZodIssue) => {
            return {
                path: one.path[one.path.length - 1],
                message: one.message
            }
        })
        return { zodErrorTitle, errorSource }
    }

    const MongooseValidationError=(error:mongoose.Error.ValidationError)=>{
        const MongooseErrorTitle = "Mongoose Validation Error"
        const errorSource:Error_Type = Object.values(error.errors).map((val:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
            return {
                path : val?.path,
                message : val.message
            }
        })
        return {
            MongooseErrorTitle,
            errorSource
        } 
    }

    if (error instanceof ZodError) {
        const gettedErrorFormat = Zod_Error_Handler(error);
        errorTitle = gettedErrorFormat.zodErrorTitle;
        errorSource = gettedErrorFormat.errorSource
    }else if(error.name==="ValidationError"){
        const gettedErrorFormat = MongooseValidationError(error);
        errorTitle = gettedErrorFormat.MongooseErrorTitle;
        errorSource = gettedErrorFormat.errorSource
    }





    return res.status(error?.statusCode | 500).json({
        success: false,
        errorTitle: errorTitle,
        errorSource: errorSource,
        stack: error.stack,
        error

    })
}

export default Global_Error_Handler;