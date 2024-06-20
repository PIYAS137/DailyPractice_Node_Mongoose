import { NextFunction, Request, Response } from "express";
import asyncCatch from "../../utils/try.code";
import { Teacher_Services } from "./teacher.services";


// Get All teacher 
const Get_All_Teacher = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await Teacher_Services.Get_Teacher_Services(query);
    res.status(200).json({
        success: true,
        message: "Successfully get teachers",
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

const Update_Teacher_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const tid = req.params.tid;
    const gettedData = req.body;
    const result = await Teacher_Services.Update_Teacher_Service(tid,gettedData);
    res.status(200).json({
        success:true,
        message : "Successfully Update A Teacher",
        data : result
    })
})
const Delete_Teacher_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const tid = req.params.tid;
    const result = await Teacher_Services.Delete_Teacher_Service(tid);
    res.status(200).json({
        success:true,
        message : "Successfully Delete A Teacher",
        data : result
    })
})




export const Teacher_Controller = {
    Get_All_Teacher,
    Get_One_Teacher,
    Update_Teacher_Controller,
    Delete_Teacher_Controller,
    
}