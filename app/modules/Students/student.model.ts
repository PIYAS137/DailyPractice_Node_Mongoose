import { Schema, model } from "mongoose";
import { Student_Type } from "./student.interface";

const Student_Schema = new Schema<Student_Type>({
    user : {
        type : Schema.Types.ObjectId,
        required : [true, "User id is very required *"],
        unique : true,
        ref : 'User'
    },
    department : {
        type : String,
        enum : {
            values : ['CSE','CIS','SWE','ICT','MCT'],
            message : '{VALUE} is not supported *'
        }
    },
    advisor : {
        type : Schema.Types.ObjectId,
        required : [true,"advisor is must required *"]
    },
    s_id : {
        type : String,
    }
})

export const Student_Model = model<Student_Type>('Student',Student_Schema);