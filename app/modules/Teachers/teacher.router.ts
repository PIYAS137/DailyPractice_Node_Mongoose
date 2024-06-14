import express from 'express'
import { Teacher_Controller } from './teacher.controller';


const router = express.Router();


router.get('/',Teacher_Controller.Get_All_Teacher);
router.get('/:tid',Teacher_Controller.Get_One_Teacher);



export const Teacher_Router = router;
