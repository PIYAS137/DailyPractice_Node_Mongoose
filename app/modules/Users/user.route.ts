import express from 'express';
import { User_Controller } from './user.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { Zod_User_Type } from './user.zod.validation';

const router = express.Router();


router.post('/',Zod_Validation_Request(Zod_User_Type),User_Controller.Create_New_User_Controller);


export const User_Router = router;