import express from 'express';
import { Auth_Controller } from './auth.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { Auth_Zod_Type, Change_Pass_Zod_Type, Cookie_Zod_Type } from './auth.zod.validation';
import TOKEN_Verify from '../../middlewares/auth.verfy';


const router = express.Router();

router.post('/login',Zod_Validation_Request(Auth_Zod_Type),Auth_Controller.Login_User_Controller);
router.post('/cpass',TOKEN_Verify(),Zod_Validation_Request(Change_Pass_Zod_Type),Auth_Controller.Change_Pass_Controller);
router.post('/rfshtoken',Zod_Validation_Request(Cookie_Zod_Type),Auth_Controller.Refresh_token_cotroller)


export const Auth_Router = router;