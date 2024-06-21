import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";
import Final_App_Error from "./FinalAppError";

type Error_Type = {
    path : string|number,
    message: string,
}[]

const Global_Error_Handler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let errorMessage = "There is an server side error *";
    let errorSource:Error_Type = [{
        path : '',
        message:"There is an server side error *"
    }]
    let statusCode = err.statusCode || 500;

    const zodHandler =(err:ZodError)=>{
        const ErrorTitle = "Zod Validation Error";
        const ErrorSource:Error_Type=err.issues.map((one:ZodIssue)=>{
            return({
                path : one.path[one?.path.length-1],
                message: one.message
            })
        })
        return {ErrorSource,ErrorTitle};
    }
    const mongooseValidationError =(err:mongoose.Error.ValidationError)=>{
        const ErrorTitle = "Mongoose Validation Error";
        const ErrorSource:Error_Type=Object.values(err.errors).map((one:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
            return({
                path: one?.path,
                message : one?.message
            })
        })
        return {ErrorSource,ErrorTitle};
    }
    const mongooseCastError =(err:mongoose.Error.CastError)=>{
        const ErrorTitle = "Mongoose Cast Error (Ref not found *)";
        const ErrorSource:Error_Type=[{
            path : err.path,
            message : err.message
        }]
        return {ErrorSource,ErrorTitle};
    }
    const duplicateKeyError =(err:any)=>{
        const regex = /{ email: "([^"]+)" }/;
        const match = err.errmsg.match(regex);
        const finalString = match[1];
        const ErrorTitle = "Duplicatte key error";
        const ErrorSource:Error_Type=[{
            path : '',
            message : `${finalString} is already into the DB`
        }]
        return {ErrorSource,ErrorTitle};
    }

    if(err instanceof ZodError){
        const gettedFormat = zodHandler(err);
        errorMessage = gettedFormat.ErrorTitle;
        errorSource = gettedFormat.ErrorSource;
    }else if(err?.name === "ValidationError"){
        const gettedFormat = mongooseValidationError(err);
        errorMessage = gettedFormat.ErrorTitle;
        errorSource = gettedFormat.ErrorSource;
    }else if(err?.code ===11000){
        const gettedFormat = duplicateKeyError(err);
        errorMessage = gettedFormat.ErrorTitle;
        errorSource = gettedFormat.ErrorSource;
    }else if(err?.name ==='CastError'){
        const gettedFormat = mongooseCastError(err);
        errorMessage = gettedFormat.ErrorTitle;
        errorSource = gettedFormat.ErrorSource;
    }else if(err instanceof Final_App_Error){
        errorMessage = err.message,
        errorSource= [{
            path : '',
            message : err.message
        }]
    }else if(err instanceof Error){
        errorMessage = err.message,
        errorSource= [{
            path : '',
            message : err.message
        }]
    }



    return res.status(statusCode).json({
        success:false,
        errorMessage,
        errorSource,
        stack:err.stack,
        // err
    })
}

export default Global_Error_Handler;