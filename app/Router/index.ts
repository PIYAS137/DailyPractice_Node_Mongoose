import express from 'express'
import { User_Router } from '../modules/Users/user.route'
import { Teacher_Router } from '../modules/Teachers/teacher.router';


const router = express.Router()


const ProjectRoutes = [
    {
        path : '/user',
        route : User_Router
    },
    {
        path : '/teacher',
        route : Teacher_Router,
    }
]

ProjectRoutes.forEach(one =>router.use(one.path,one.route));


export default router;