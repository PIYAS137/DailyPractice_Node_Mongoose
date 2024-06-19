import mongoose from "mongoose";
import Final_App_Error from "../../errors/FinalAppError";
import { Student_Type } from "../Students/student.interface";
import { Student_Model } from "../Students/student.model";
import { Teacher_Type } from "../Teachers/teacher.interface";
import { Teacher_Model } from "../Teachers/teacher.model";
import { Get_Data_Type, Get_Student_Data_Type, User_Type } from "./user.interface";
import { User_Model } from "./user.model";





// Create Teacher Service 
const Create_Teacher_Service = async (data: Get_Data_Type) => {


    let user: User_Type = {
        name: {
            f_name: data.user.name.f_name as string,
            m_name: data.user.name.m_name || undefined,
            l_name: data.user.name.l_name
        },
        age: data.user.age,
        email: data.user.email,
        phone: data.user.phone,
        gender: data.user.gender,
        dateOfBirth: data.user.dateOfBirth
    };
    const tid = "TEACHER_0001"
        const session = await mongoose.startSession();
        try{
            session.startTransaction();
        const newUser = await User_Model.create([user],{session});
        if(!newUser){
            throw new Final_App_Error(400,"User not created !")
        }
        const teacher: Teacher_Type = {
            user: newUser[0]._id,
            department: data.department,
            salary: data.salary,
            t_id: tid
        }
        const result = await Teacher_Model.create([teacher],{session});
        if(!result){
            throw new Final_App_Error(400,"Teacher not created !")
        }
        await session.commitTransaction();
        await session.endSession()
        return result;
    }catch(err:any){ 
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}
// Create Student Service 
const Create_Student_Service = async (data: Get_Student_Data_Type) => {
        let user: User_Type = {
            name: {
                f_name: data.user.name.f_name as string,
                m_name: data.user.name.m_name || undefined,
                l_name: data.user.name.l_name
            },
            age: data.user.age,
            email: data.user.email,
            phone: data.user.phone,
            gender: data.user.gender,
            dateOfBirth: data.user.dateOfBirth
        };

        const session = await mongoose.startSession();
        try {
            session.startTransaction();
        const newUser = await User_Model.create([user], { session });
        const s_id = "Student_0001"
        if (Object.keys(newUser).length) {
            const student: Student_Type = {
                user: newUser[0]._id,
                department: data.department,
                advisor: data.advisor,
                s_id: s_id
            }
            const result = await Student_Model.create([student], { session });

            await session.commitTransaction();
            await session.endSession();
            return result;
        }
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Final_App_Error(400, err.message || "There is an problem in process - Transaction and rollback *");
    }
}





export const User_Services = {
    Create_Teacher_Service,
    Create_Student_Service

}