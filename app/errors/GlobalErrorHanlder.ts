import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";
import Final_App_Error from "./FinalAppError";

type Error_Type = {
    path: string | number,
    message: string
}[]

const Global_Error_Handler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;

    let errorTitle = "There is an server side error *";
    let errorSource: Error_Type = [
        {
            path: '',
            message: ''
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

    const MongooseValidationError = (error: mongoose.Error.ValidationError) => {
        const MongooseErrorTitle = "Mongoose Validation Error"
        const errorSource: Error_Type = Object.values(error.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val.message
            }
        })
        return {
            MongooseErrorTitle,
            errorSource
        }
    }

    const DuplicateMongooseError = (error: any) => {
        const regex = /{ email: "([^"]+)" }/;
        const match = error.errorResponse.errmsg.match(regex);
        const finalString = match[1];
        const Error_Source: Error_Type = [{
            path: '',
            message: `${finalString} is already exist into the record *`
        }]
        const ErrorTitle = "Duplicate Property Found *"
        return { Error_Source, ErrorTitle }
    }

    const MongooseCastError = (error: mongoose.Error.CastError) => {
        const ErrorTitle = "Reference Not Found Error *";
        const ErrorSource: Error_Type = [{
            path: error.path,
            message: error.message
        }]
        return { ErrorTitle, ErrorSource }
    }




    if (err instanceof ZodError) {
        const gettedErrorFormat = Zod_Error_Handler(err);
        errorTitle = gettedErrorFormat.zodErrorTitle;
        errorSource = gettedErrorFormat.errorSource
    } else if (err.name === "ValidationError") {
        const gettedErrorFormat = MongooseValidationError(err);
        errorTitle = gettedErrorFormat.MongooseErrorTitle;
        errorSource = gettedErrorFormat.errorSource
    } else if (err.code === 11000) {
        const gettedErrorFormat = DuplicateMongooseError(err);
        errorTitle = gettedErrorFormat.ErrorTitle;
        errorSource = gettedErrorFormat.Error_Source
    } else if (err.name === 'CastError') {
        const gettedErrorFormat = MongooseCastError(err);
        errorTitle = gettedErrorFormat.ErrorTitle;
        errorSource = gettedErrorFormat.ErrorSource
    } else if (err instanceof Final_App_Error) {
        errorTitle = err.message,
            errorSource = [{
                path: '',
                message: err.message
            }]
    } else if (err instanceof Error) {
        errorTitle = err.message,
            errorSource = [{
                path: '',
                message: err.message
            }]
    }




    return res.status(statusCode).json({
        success: false,
        errorTitle: errorTitle,
        errorSource: errorSource,
        stack: err.stack,
    })
}

export default Global_Error_Handler;