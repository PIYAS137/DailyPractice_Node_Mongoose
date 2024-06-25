import config from "../../config";
import Final_App_Error from "../../errors/FinalAppError";
import { create_Token } from "../../utils/auth.createToken";
import { SendEmail } from "../../utils/nodeMailer";
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

const Forget_pass_Service=async(userId:{userId:string},cookie:Record<string,unknown>)=>{
    // check if the token userId and params userid mathced ?
    const decodedTokenData = jwt.verify((cookie.refreshToken as string),config.jwt_secret as string) as JwtPayload;
    if(decodedTokenData.data.userId!==userId.userId){
        throw new Final_App_Error(400,"Forbidded Access *")
    }
    const user = await User_Model.findOne({id : userId.userId});
    if(!user){
        throw new Final_App_Error(400,"No user found *");
    }

    const ForgetPassAccessToken = create_Token(user.id,'5m')
    console.log(ForgetPassAccessToken);

    const clientUrl = `${config.client_url}?userId=${user.id}&token=${ForgetPassAccessToken}`;
    SendEmail(user.email,clientUrl)
    const data = "Successfully Generated Link, Check email"
    return data;
}

const Reset_pass_Service=async(data:{userId:string,newPass:string},token:string)=>{

    const decodedUser = jwt.verify(token,config.jwt_secret as string) as JwtPayload

    if(decodedUser?.data?.userId !== data.userId){
        throw new Final_App_Error(400,"Tomar token er sathe pathano id er mil nai");
    }

    const user = await User_Model.findOne({id:data.userId});
    if(!user){
        throw new Final_App_Error(404,"Ei user database a nai *")
    }

    const decodedPass = await bcrypt.hash(data.newPass,Number(config.bsr))
    const result= await User_Model.findOneAndUpdate(user._id,{
        pass:decodedPass,
        needPassChange:false,
        passChangedAt: new Date,
    },{new:true})


    return result;
} 


export const Auth_Services = {
    login_User_Service,
    change_pass_controller,
    Refresh_Token_Service,
    Forget_pass_Service,
    Reset_pass_Service
}
