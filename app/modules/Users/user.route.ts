import express from 'express';
import { User_Controller } from './user.controller';

const router = express.Router();


router.post('/',User_Controller.Create_New_User_Controller);


export const User_Router = router;