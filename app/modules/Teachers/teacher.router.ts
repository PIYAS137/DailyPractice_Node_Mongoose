import express from 'express'
import { Teacher_Controller } from './teacher.controller';
import Zod_Validation_Request from '../../middlewares/zod.validator.request';
import { Zod_Update_Teacher_Schema } from './teacher.zod.validation';


const router = express.Router();


router.get('/',Teacher_Controller.Get_All_Teacher);
router.get('/:tid',Teacher_Controller.Get_One_Teacher);
router.patch('/:tid',Zod_Validation_Request(Zod_Update_Teacher_Schema),Teacher_Controller.Update_Teacher_Controller)


export const Teacher_Router = router;
