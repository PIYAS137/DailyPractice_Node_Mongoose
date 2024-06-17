import { Types } from "mongoose"
import { User_Type } from "../Users/user.interface"


export type Student_Type = {
    user : Types.ObjectId,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    advisor: Types.ObjectId,
    s_id : string
}