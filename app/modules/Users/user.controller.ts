import {NextFunction, Request,Response} from 'express'
import { User_Services } from './user.services';

const Create_New_User_Controller =async (req:Request,res:Response,next:NextFunction) => {
    try{
        const data = req.body;
    const result = await User_Services.Create_New_User_Service(data)
    res.status(200).json({
        success : true,
        message : "Successfully Create User",
        data : result
    })
    }catch(err){
        next(err)
    }

}



export const User_Controller = {
    Create_New_User_Controller
}