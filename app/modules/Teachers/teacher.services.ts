import { Teacher_Type } from "./teacher.interface";
import { Teacher_Model } from "./teacher.model"


// get all teacher service
const Get_Teacher_Services = async () => {
    const data = await Teacher_Model.find().populate('user');
    return data;
}

// get one teacher service 
const Get_One_Teacher_Service=async(tid:string)=>{
    const data = await Teacher_Model.findById({_id : tid}).populate('user');
    return data;
}

// update a teacher_services
const Update_Teacher_Service=async(tid:string,updatedData:Partial<Teacher_Type>)=>{
    const {...remainingPremitiveData}=updatedData;

    const modifiedUpdatedData:Record<string,unknown>={
        ...remainingPremitiveData
    }

    const result = await Teacher_Model.findByIdAndUpdate({_id:tid},modifiedUpdatedData,{new:true});
    return result;
}

export const Teacher_Services = {
    Get_Teacher_Services,
    Get_One_Teacher_Service,
    Update_Teacher_Service
}