
import jwt from 'jsonwebtoken'
import config from '../config'

export const create_Token = (id:string,exp:string) =>{
    return jwt.sign({
        data: {
            userId : id
        },
    },config.jwt_secret as string, {
        expiresIn:exp
    })
}