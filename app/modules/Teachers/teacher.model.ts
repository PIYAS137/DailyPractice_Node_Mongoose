import { Schema, model } from "mongoose";
import { Custom_Teacher_Method, Teacher_Type } from "./teacher.interface";
import Final_App_Error from "../../errors/FinalAppError";

const Teacher_Schema = new Schema<Teacher_Type, Custom_Teacher_Method>({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "User id is very required *"],
        unique: true,
        ref: 'User'
    },
    department: {
        type: String,
        enum: {
            values: ['CSE', 'CIS', 'SWE', 'ICT', 'MCT'],
            message: '{VALUE} is not supported *'
        }
    },
    salary: {
        type: String,
        required: [true, "Salary is required data *"]
    },
    t_id: {
        type: String,
        required: [true, "teacher id is required *"]
    }
})

Teacher_Schema.statics.isTeacherExist=async function(id){
    const teacher = await Teacher_Model.findById({_id:id});
    return teacher;
}




export const Teacher_Model = model<Teacher_Type, Custom_Teacher_Method>('Teacher', Teacher_Schema);

