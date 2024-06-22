import express from 'express'
import { User_Router } from '../modules/Users/user.route'
import { Teacher_Router } from '../modules/Teachers/teacher.router';
import { Student_Router } from '../modules/Students/student.router';
import { Auth_Router } from '../modules/Auth/auth.route';


const router = express.Router()


const ProjectRoutes = [
    {
        path : '/user',
        route : User_Router
    },
    {
        path : '/teacher',
        route : Teacher_Router,
    },
    {
        path : '/student',
        route : Student_Router
    },
    {
        path : '/auth',
        route : Auth_Router,
    }
]

ProjectRoutes.forEach(one =>router.use(one.path,one.route));


export default router;