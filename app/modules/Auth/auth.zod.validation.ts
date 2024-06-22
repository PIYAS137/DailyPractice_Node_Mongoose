import { z } from "zod";


export const Auth_Zod_Type = z.object({
    body:z.object({
        id: z.string(),
        pass : z.string()
    })
})

