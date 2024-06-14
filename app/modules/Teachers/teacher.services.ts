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


export const Teacher_Services = {
    Get_Teacher_Services,
    Get_One_Teacher_Service,

}