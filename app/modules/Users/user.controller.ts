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



export const User_Controller = {
    Create_New_User_Controller
}