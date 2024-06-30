import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join(process.cwd(),'.env')})

export default {
    port : process.env.PORT,
    db_url : process.env.DB_URL,
    sds : process.env.SDS,
    bsr:process.env.SR,
    jwt_secret:process.env.JWT_SECRET,
    client_url : process.env.ClientURL,
    mail_secret:process.env.MAIL_SECRET
}