import { NextFunction, Request, Response } from "express";
import asyncCatch from "../utils/try.code";
import Final_App_Error from "../errors/FinalAppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User_Model } from "../modules/Users/user.model";


const TOKEN_Verify = () => {
    return asyncCatch(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;
        if (!token) {
            // the token in undefined now !
            throw new Final_App_Error(401, "This user is not authorized !")
        }


        

        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
        req.user = decoded;

        const user = await User_Model.findOne({id:decoded?.data?.userId})
        if(user?.passChangedAt && User_Model.isTokenValid(Number(decoded.iat),user?.passChangedAt)){
            // Token is expire throw change password !
            throw new Final_App_Error(400,"Forbidded Access Found *")
            
        }



        next()
    })
}

export default TOKEN_Verify