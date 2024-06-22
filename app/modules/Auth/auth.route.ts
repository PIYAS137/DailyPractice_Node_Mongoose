import express from 'express';
import { Auth_Controller } from './auth.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { Auth_Zod_Type } from './auth.zod.validation';


const router = express.Router();

router.post('/login',Zod_Validation_Request(Auth_Zod_Type),Auth_Controller.Login_User_Controller);



export const Auth_Router = router;