import { Request, Response } from "express";
import { Auth_Services } from "./auth.services";
import asyncCatch from "../../utils/try.code";




const Login_User_Controller = asyncCatch(async (req: Request, res: Response) => {
    const result = await Auth_Services.login_User_Service(req.body);

    res.status(200).json({
        success: true,
        message: "Successfully Login User !",
        data: result,
    })
})



export const Auth_Controller = {
    Login_User_Controller,
}