import { Schema, model } from "mongoose";
import { Teacher_Type } from "./teacher.interface";

const Teacher_Schema = new Schema<Teacher_Type>({
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
    salary : {
        type : String,
        required : [true,"Salary is required data *"]
    },
    t_id : {
        type : String,
        required : [true, "teacher id is required *"]
    }
})


export const Teacher_Model = model<Teacher_Type>('Teacher',Teacher_Schema);

