import nodemailer from 'nodemailer';
import config from '../config';


export const SendEmail = async (to:string,html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "piyasmahmudealif@gmail.com",
            pass: config.mail_secret,
        },
    });
    await transporter.sendMail({
        from: 'Programming Hero - Piyas', // sender address
        to, // list of receivers
        subject: "Password Change kor vai !", // Subject line
        text: "", // plain text body
        html, // html body
    });
}