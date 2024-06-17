import { z } from 'zod';
import { Zod_User_Type } from '../Users/user.zod.validation';



const Zod_Student_Schema = z.object({
    body : z.object({
        user : Zod_User_Type,
        department : z.string(),
        advisor : z.string()
    })
})


const Zod_Update_Student_Schema=z.object({
    body: z.object({
        user : z.string().optional(),
        department : z.string().optional(),
        advisor : z.string().optional()
    })
})

export {Zod_Student_Schema,Zod_Update_Student_Schema};
