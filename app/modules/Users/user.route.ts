import express from 'express';
import { User_Controller } from './user.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { Zod_Teacher_Schema } from '../Teachers/teacher.zod.validation';

const router = express.Router();

router.post('/teacher',Zod_Validation_Request(Zod_Teacher_Schema),User_Controller.Create_Teacher_Controller)



export const User_Router = router;