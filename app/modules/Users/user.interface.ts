import { Model, Types } from "mongoose"


export type Name_Type = {
    f_name : string,
    m_name?: string,
    l_name : string
}

export type User_Type = {
    name : Name_Type,
    id:string,
    pass:string,
    needPassChange:boolean,
    passChangedAt?:Date,
    age : number,
    email : string,
    phone : string,
    gender : 'male'|'female'|'other',
    dateOfBirth : string //13 May 2003
}

export type Get_Data_Type = {
    user : User_Type,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    salary : string
}
export type Get_Student_Data_Type = {
    user : User_Type,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    advisor : Types.ObjectId,
}

export interface User_Custom_Static_Method extends Model<User_Type>{
    isUserExist(id:string):Promise<User_Type|null>,
    isTokenValid(tokenIAT:number,passUAt:Date):boolean
}
