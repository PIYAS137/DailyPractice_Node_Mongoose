import { model, Schema } from "mongoose";
import { Name_Type, User_Type } from "./user.interface";

const User_Name_Schema = new Schema<Name_Type>({
    f_name : {
        type : String,
        required : [true,"First name is requred *"]
    },
    m_name : {
        type : String,
    },
    l_name : {
        type : String,
        required : [true,"Last name is requred *"]
    },
    
})

const User_Schema = new Schema<User_Type>({
    name : {
        type : User_Name_Schema,
        required : [true, "Name is requred *"]
    },
    email : {
        type :String,
        unique :true,
        required : [true, "Email is very required *"]
    },
    age : {
        type : Number,
        required : [true, "Age is required *"]
    },
    phone : {
        type : String,
        required: [true, "Phone number is required *"]
    },
    gender : {
        type : String,
        enum : {
            values : ['male','female','other'],
            message : '{VALUE} is not supported for gender *'
        }
    },
    dateOfBirth : {
        type : String,
        required : [true, "Date of Birth is required *"]
    }
},{
    toJSON : {
        virtuals : true
    }
})

User_Schema.virtual('fullName').get(function(){
    return `${this.name.f_name} ${this.name.m_name} ${this.name.l_name}`
})

export const User_Model = model<User_Type>('User',User_Schema);