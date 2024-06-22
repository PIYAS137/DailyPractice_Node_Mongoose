import Final_App_Error from "../../errors/FinalAppError";
import { User_Model } from "../Users/user.model";
import { Auth_Type } from "./auth.interface";
import bcrypt from 'bcrypt';



const login_User_Service = async(data:Auth_Type)=>{
    console.log(data.id);
    const isUserExistByUserID = await User_Model.findOne({id:data?.id});
    if(!isUserExistByUserID){
        throw new Final_App_Error(404,"User is not in record *");
    }
    const isPasswordMatch = await bcrypt.compare(data.pass,isUserExistByUserID?.pass);
    if(!isPasswordMatch){
        throw new Final_App_Error(400,"Forbidded User *");
    }
    // now my password and id is ok !



    
    return {};
}


export const Auth_Services = {
    login_User_Service,
}