import { model, Schema } from "mongoose";
import { Name_Type, User_Custom_Static_Method, User_Type } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const User_Name_Schema = new Schema<Name_Type>({
    f_name: {
        type: String,
        required: [true, "First name is requred *"]
    },
    m_name: {
        type: String,
    },
    l_name: {
        type: String,
        required: [true, "Last name is requred *"]
    },

})

const User_Schema = new Schema<User_Type, User_Custom_Static_Method>({
    name: {
        type: User_Name_Schema,
        required: [true, "Name is requred *"]
    },
    id: {
        type: String,
        required: [true, "Id is requred *"]
    },
    pass: {
        type: String,
        required: [true, "Id is requred *"],
        select: 0
    },
    needPassChange:{
        type : Boolean,
        default:true,
    },
    passChangedAt:{
        type : Date,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is very required *"]
    },
    age: {
        type: Number,
        required: [true, "Age is required *"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required *"]
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported for gender *'
        },
        required: [true, "valie is very required"]
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of Birth is required *"]
    },
    profile: {
        type : String,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

User_Schema.virtual('fullName').get(function () {
    if (this.name.m_name) {
        return `${this.name.f_name} ${this.name.m_name} ${this.name.l_name}`
    } else {
        return `${this.name.f_name}${this.name.m_name ? this.name.m_name : ''} ${this.name.l_name}`
    }
})

User_Schema.pre('save', async function (next) {
    const data = this;
    data.pass = await bcrypt.hash(data.pass, Number(config.bsr));
    next();
})


User_Schema.statics.isUserExist = async function (id: string) {
    const isUserExistById = await User_Model.findById(id);
    return isUserExistById;
}

User_Schema.statics.isTokenValid = function (tokenIAT:number,passUAt:Date){
    const UKorsi = new Date(passUAt).getTime()/1000;
    return UKorsi>tokenIAT
}




export const User_Model = model<User_Type, User_Custom_Static_Method>('User', User_Schema);

