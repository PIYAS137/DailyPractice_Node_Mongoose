import Final_App_Error from "../../errors/FinalAppError";
import { Teacher_Type } from "../Teachers/teacher.interface";
import { Teacher_Model } from "../Teachers/teacher.model";
import { Get_Data_Type, User_Type } from "./user.interface";
import { User_Model } from "./user.model";





// Create Teacher Service 
const Create_Teacher_Service = async(data : Get_Data_Type)=>{

    const isExist = await User_Model.isUserExistByEmail(data.user.email);
    if(isExist){
        throw new Final_App_Error(500,"Already Exist User by Email *")
    }

    let user : User_Type = {
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

    const newUser = await User_Model.create(user);

    const tid = "TEACHER_0001"

    if(Object.keys(newUser).length){
        const teacher : Teacher_Type = {
            user : newUser._id,
            department : data.department,
            salary : data.salary,
            t_id : tid
        }
        const result = await Teacher_Model.create(teacher);
        return result;
    }

    



}
export const User_Services = {
    Create_Teacher_Service,
    
}