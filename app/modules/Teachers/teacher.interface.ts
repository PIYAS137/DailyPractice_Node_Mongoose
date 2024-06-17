
import { Model, Types } from "mongoose"

export type Teacher_Type = {
    user : Types.ObjectId,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    salary : string,
    t_id : string
}


export interface Custom_Teacher_Method extends Model<Teacher_Type>{
    isTeacherExist(tid:string) : Promise<Teacher_Type|null>
}