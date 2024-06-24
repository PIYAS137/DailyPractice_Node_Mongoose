import { Request, Response } from "express";
import { Auth_Services } from "./auth.services";
import asyncCatch from "../../utils/try.code";
import config from "../../config";


const Login_User_Controller = asyncCatch(async (req: Request, res: Response) => {
    const result = await Auth_Services.login_User_Service(req.body);
    const { accessToken, refreshToken, needPassChange } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.sds !== 'DEVELOPMENT',
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Successfully Login User !",
        data: {
            accessToken,
            needPassChange
        },
    })
})
const Change_Pass_Controller = asyncCatch(async (req: Request, res: Response) => {

    const result = await Auth_Services.change_pass_controller(req.user, req.body);
    res.status(200).json({
        success: true,
        message: "Successfully Login User !",
        data: result,
    })
})
const Refresh_token_cotroller = asyncCatch(async (req: Request, res: Response) => {

    const { accessToken } = await Auth_Services.Refresh_Token_Service(req.cookies.refreshToken)
    res.status(200).json({
        success: true,
        message: "Successfully Login User !",
        data: accessToken,
    })
})



export const Auth_Controller = {
    Login_User_Controller,
    Change_Pass_Controller,
    Refresh_token_cotroller
}