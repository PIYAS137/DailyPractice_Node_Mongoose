

export type Name_Type = {
    f_name : String,
    m_name : String,
    l_name : String
}

export type User_Type = {
    name : Name_Type,
    age : Number,
    phone : String,
    gender : 'male'|'female'|'other',
    dateOfBirth : String //13 May 2003
}