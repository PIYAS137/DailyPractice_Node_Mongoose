
import { Types } from "mongoose"

export type Teacher_Type = {
    user : Types.ObjectId,
    department : 'CSE'|'CIS'|'SWE'|'ICT'|'MCT',
    salary : string,
    t_id : string
}