import { NextFunction, Request, Response } from 'express'
import { User_Services } from './user.services';
import asyncCatch from '../../utils/try.code';
import { Get_Data_Type, Get_Student_Data_Type } from './user.interface';




// Create Teacher 
const Create_Teacher_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const data : Get_Data_Type = req.body;
    const result = await User_Services.Create_Teacher_Service(data);
    res.status(200).json({
        success: true,
        message: "Successfully Create Teacher",
        data: result
    })
})
// Create Student 
const Create_Student_Controller=asyncCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const data : Get_Student_Data_Type = req.body;
    console.log(data);
    const result = await User_Services.Create_Student_Service(data);
    res.status(200).json({
        success: true,
        message: "Successfully Create Student",
        data: result
    })
})




export const User_Controller = {

    Create_Teacher_Controller,
    Create_Student_Controller
}