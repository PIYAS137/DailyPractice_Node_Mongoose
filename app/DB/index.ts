import { User_Model } from "../modules/Users/user.model"


const superUserData = {
    name: {
        f_name: "Jannatul",
        m_name: "Ferdaus",
        l_name: "Sumaiya"
    },
    id: 'super',
    pass: "super01",
    needPassChange: false,
    age: 24,
    email: "jannat@gmail.com",
    phone: "01111111",
    gender: 'female',
    dateOfBirth: "13 May 2003",
}

export const seedSuperUser=async()=>{
    const isSuperUserExist = await User_Model.findOne({id:"super"});
    if(!isSuperUserExist){
        await User_Model.create(superUserData);
    }
}
