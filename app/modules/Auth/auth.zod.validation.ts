import { z } from "zod";


export const Auth_Zod_Type = z.object({
    body: z.object({
        id: z.string(),
        pass: z.string()
    })
})

export const Change_Pass_Zod_Type = z.object({
    body: z.object({
        oldPass: z.string(),
        newPass: z.string(),
    })
})

export const Cookie_Zod_Type = z.object({
    cookie:z.object({
        refreshToken:z.string({
            required_error:"Refresh Token is very important"
        })
    })
})

export const Zod_Type_Forget_pass=z.object({
    body:z.object({
        userId:z.string({
            required_error:"UserId is very required *"
        })
    })
})

export const Zod_Type_Reset_pass=z.object({
    body:z.object({
        userId:z.string({
            required_error:"UserId is very required *"
        }),
        newPass: z.string({
            required_error:"New Password is required *"
        }),
    })
})