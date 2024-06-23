import { NextFunction, Request, Response } from "express";
import asyncCatch from "../utils/try.code";
import Final_App_Error from "../errors/FinalAppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";


const TOKEN_Verify = () => {
    return asyncCatch(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;
        if (!token) {
            // the token in undefined now !
            throw new Final_App_Error(401, "This user is not authorized !")
        }

        jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
            // err
            if(err){
                throw new Final_App_Error(401, "This user is not authorized !")
            }
            // decoded undefined
            req.user = decoded as JwtPayload;
        });





        next()
    })
}

export default TOKEN_Verify