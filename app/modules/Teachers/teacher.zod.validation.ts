import { z } from 'zod';
import { Zod_User_Type } from '../Users/user.zod.validation';



const Zod_Teacher_Schema = z.object({
    body : z.object({
        user : Zod_User_Type,
        department : z.string(),
        salary : z.string()
    })
})




export {Zod_Teacher_Schema};
