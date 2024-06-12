

export type Name_Type = {
    f_name : string,
    m_name : string,
    l_name : string
}

export type User_Type = {
    name : Name_Type,
    age : number,
    email : string,
    phone : string,
    gender : 'male'|'female'|'other',
    dateOfBirth : string //13 May 2003
}