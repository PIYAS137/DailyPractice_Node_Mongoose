import { User_Type } from "./user.interface";
import { User_Model } from "./user.model";


// Create a user
const Create_New_User_Service = async (data: User_Type) => {
    const result = await User_Model.create(data);
    return result;
}

// Get all users
const Get_All_User = async () => {
    const result = await User_Model.find();
    return result;
}

//Get one user 
const Get_One_User = async (id: string) => {
    const isExist = await User_Model.isUserExist(id);
    if(!isExist){
        throw new Error("User is not exist anymore *")
    }
    const result = await User_Model.find({ _id: id });
    return result;
}

// User upate 
const User_Update_Service = async (uid: string, ud: User_Type) => {
    const isExist = await User_Model.isUserExist(uid);
    if(!isExist){
        throw new Error("User is not exist anymore *")
    }
    const updatedDoc = {
        $set: {
            "name.f_name": ud.name.f_name,
            "name.m_name": ud.name.m_name,
            "name.l_name": ud.name.l_name,
            age: ud.age,
            phone: ud.phone,
            gender: ud.gender,
            dateOfBirth: ud.dateOfBirth
        }
    }
    const result = await User_Model.findOneAndUpdate({ _id: uid }, updatedDoc, { new: true });
    return result;
}

// Delete user service 
const Delete_User_Service = async (uid: string) => {
    const isExist = await User_Model.isUserExist(uid);
    if(!isExist){
        throw new Error("User is not exist anymore *")
    }
    const result = await User_Model.findOneAndDelete({ _id: uid });
    return result;
}

export const User_Services = {
    Create_New_User_Service,
    Get_All_User,
    Get_One_User,
    User_Update_Service,
    Delete_User_Service
}