import config from "../../config";
import Final_App_Error from "../../errors/FinalAppError";
import { create_Token } from "../../utils/auth.createToken";
import { User_Model } from "../Users/user.model";
import { Auth_Type, C_Pass_Type } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'



const login_User_Service = async (data: Auth_Type) => {
    const isUserExistByUserID = await User_Model.findOne({ id: data?.id }).select("+pass");
    if (!isUserExistByUserID) {
        throw new Final_App_Error(404, "User is not in record *");
    }
    const encodedPass = await bcrypt.compare(data.pass, isUserExistByUserID?.pass);
    if (!encodedPass) {
        throw new Final_App_Error(400, "Forbidded User *");
    }
    // now my password and id is ok !


    const accessToken = create_Token(isUserExistByUserID.id,'1h')
    const refreshToken = create_Token(isUserExistByUserID.id,'1d')

    return {
        accessToken,refreshToken,
        needPassChange:isUserExistByUserID.needPassChange
    };
}


const change_pass_controller=async(tokenData:JwtPayload,data:C_Pass_Type)=>{
    const isUserExistByUserID = await User_Model.findOne({ id: tokenData.data.userId }).select("+pass");
    if (!isUserExistByUserID) {
        throw new Final_App_Error(404, "User is not in record *");
    }
    const encodedPass = await bcrypt.compare(data.oldPass, isUserExistByUserID?.pass);
    if (!encodedPass) {
        throw new Final_App_Error(400, "Password is not matched *");
    }
    const encodePass = await bcrypt.hash(data.newPass,Number(config.bsr))
    const result= await User_Model.findOneAndUpdate(isUserExistByUserID._id,{
        pass:encodePass,
        needPassChange:false,
        passChangedAt: new Date,
    },{new:true})
    return result
}

const Refresh_Token_Service = async(RfTOken:string)=>{
    const decodedData = jwt.verify(RfTOken, config.jwt_secret as string) as JwtPayload;
    const user = await User_Model.findOne({id : decodedData.data.userId});
    if(!user){
        throw new Final_App_Error(404,"Token is not valid !");
    }
    const accessToken = create_Token(user.id,'1h')
    return {accessToken};
}

export const Auth_Services = {
    login_User_Service,
    change_pass_controller,
    Refresh_Token_Service
}