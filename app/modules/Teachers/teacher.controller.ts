import { NextFunction, Request, Response } from "express";
import asyncCatch from "../../utils/try.code";
import { Teacher_Services } from "./teacher.services";


// Get All teacher 
const Get_All_Teacher = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Teacher_Services.Get_Teacher_Services();
    res.status(200).json({
        success: true,
        message: "Successfully Get Teachers",
        data: result
    })
})

const Get_One_Teacher = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const tid: string = req.params.tid as string;
    const result = await Teacher_Services.Get_One_Teacher_Service(tid);
    res.status(200).json({
        success: true,
        message: "Successfully Get A Teacher",
        data: result
    })
})


export const Teacher_Controller = {
    Get_All_Teacher,
    Get_One_Teacher,
    
}