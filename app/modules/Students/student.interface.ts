import { Types } from "mongoose"


export type Student_Type = {
    user : Types.ObjectId,
    s_id : string,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    advisor : Types.ObjectId
}
