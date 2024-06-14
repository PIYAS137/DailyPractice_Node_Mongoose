import { NextFunction, Request, Response } from 'express'
import { User_Services } from './user.services';
import asyncCatch from '../../utils/try.code';

const Create_New_User_Controller = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await User_Services.Create_New_User_Service(data)
    res.status(200).json({
        success: true,
        message: "Successfully Create User",
        data: result
    })
})

// get all user controller 
const Get_All_User_Controller = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await User_Services.Get_All_User();
    res.status(200).json({
        success: true,
        message: "Successfully Get All User",
        data: result
    })
}
)

// get one user
const Get_One_User_Controller =asyncCatch(async (req:Request,res:Response,next:NextFunction)=>{
    const sid:string = req.params.uid as string;  
    const result = await User_Services.Get_One_User(sid);
    res.status(200).json({
        success: true,
        message: "Successfully Get A User",
        data: result[0]
    })
})

//update user
const Update_User_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const uid = req.params.uid;
    const updatedDoc = req.body;
    const result = await User_Services.User_Update_Service(uid,updatedDoc);
    res.status(200).json({
        success: true,
        message: "Successfully Update User",
        data: result
    })
})

// delete user
const Delete_User_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const uid = req.params.uid as string;
    const result = await User_Services.Delete_User_Service(uid);
    res.status(200).json({
        success: true,
        message: "Successfully Delete User",
        data: result
    })
})

export const User_Controller = {
    Create_New_User_Controller,
    Get_All_User_Controller,
    Get_One_User_Controller,
    Update_User_Controller,
    Delete_User_Controller
}