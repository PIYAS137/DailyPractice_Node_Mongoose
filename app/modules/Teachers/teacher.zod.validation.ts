import { z } from 'zod';
import { Zod_User_Type } from '../Users/user.zod.validation';



const Zod_Teacher_Schema = z.object({
    body : z.object({
        user : Zod_User_Type,
        department : z.string(),
        salary : z.string()
    })
})


const Zod_Update_Teacher_Schema=z.object({
    body: z.object({
        user : z.string().optional(),
        department : z.string().optional(),
        salary : z.string().optional()
    })
})

export {Zod_Teacher_Schema,Zod_Update_Teacher_Schema};
