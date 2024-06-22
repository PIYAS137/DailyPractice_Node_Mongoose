import { z } from 'zod';

// Define the schema for Name_Type
const Zod_Name_Type = z.object({
    f_name: z.string(),
    m_name: z.string().optional(),
    l_name: z.string(),
});

// Define the schema for User_Type
const Zod_User_Type = z.object({
    name: Zod_Name_Type,
    id:z.string(),
    pass:z.string(),
    email: z.string(),
    age: z.number().int().min(0),
    phone: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string()
});


const UPDATE_Zod_Name_Type = z.object({
    f_name: z.string().optional(),
    m_name: z.string().optional(),
    l_name: z.string().optional(),
});

// Define the schema for User_Type
const UPDATE_Zod_User_Type = z.object({
    body: z.object({
        name: UPDATE_Zod_Name_Type,
        id:z.string().optional(),
        pass:z.string().optional(),
        email: z.string().optional(),
        age: z.number().int().min(0).optional(),
        phone: z.string().optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional()
    })
});





export { Zod_User_Type, UPDATE_Zod_User_Type };
