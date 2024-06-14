import express from 'express';
import { User_Controller } from './user.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { UPDATE_Zod_User_Type, Zod_User_Type } from './user.zod.validation';

const router = express.Router();


router.post('/',Zod_Validation_Request(Zod_User_Type),User_Controller.Create_New_User_Controller);
router.get('/',User_Controller.Get_All_User_Controller);
router.get('/:uid',User_Controller.Get_One_User_Controller);
router.patch('/:uid',Zod_Validation_Request(UPDATE_Zod_User_Type),User_Controller.Update_User_Controller);
router.delete('/:uid',User_Controller.Delete_User_Controller);


export const User_Router = router;