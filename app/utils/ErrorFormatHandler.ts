import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";

export type Error_Type ={
    path : string|number,
    message : string
}[]




export const HandleZodError=(err:ZodError)=>{
    const ErrorMessage = "Zod Validation Error *";
    const ErrorSource:Error_Type = err.issues.map((one:ZodIssue)=>{
        return {
            path : one.path[one.path.length-1],
            message : one.message
        }
    })
    return {ErrorMessage,ErrorSource}
}

export const MongooseValidatorError=(err:mongoose.Error.ValidationError)=>{
    const ErrorMessage = "Mongoose Validation Error *";
    const ErrorSource = Object.values(err.errors).map((one:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
        return{
            path : one.path,
            message : one.message
        }
    })
    return {ErrorMessage,ErrorSource}
}

export const MongooseCastError=(err:mongoose.Error.CastError)=>{
    const ErrorMessage = "Reference not found (Cast Error) Error *";
    const ErrorSource = [{
        path :err.path,
        message : err.message
    }]
    return {ErrorMessage,ErrorSource}
}

export const DuplicateKeyError=(err:any)=>{
    const regex = /{ email: "([^"]+)" }/;
    const match = err.errmsg.match(regex);
    const finalString = match[1];
    const ErrorMessage = "Duplicate key value error *";
    const ErrorSource:Error_Type = [{
        path : '',
        message : `${finalString} is already into the DB*`
    }]
    return {ErrorMessage,ErrorSource}
}