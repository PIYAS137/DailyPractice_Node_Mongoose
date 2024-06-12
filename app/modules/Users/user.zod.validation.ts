import { z } from 'zod';

// Define the schema for Name_Type
const Zod_Name_Type = z.object({
    f_name: z.string(),
    m_name: z.string(),
    l_name: z.string(),
});

// Define the schema for User_Type
const Zod_User_Type = z.object({
    body: z.object({
        name: Zod_Name_Type,
        email : z.string(),
        age: z.number().int().min(0),
        phone: z.string(),
        gender: z.enum(['male', 'female', 'other']),
        dateOfBirth: z.string()
    })
});

export { Zod_Name_Type, Zod_User_Type };
