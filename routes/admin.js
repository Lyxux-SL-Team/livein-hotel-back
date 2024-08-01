import express from 'express';
import { CheckAdminEmailController,CreateAdminController,LoginAdminController,UpdateAdminController  } from '../controllers/admin.js';



const router = express.Router();

router.post('/checkEmail', CheckAdminEmailController);
router.post('/createAdmin',CreateAdminController);
router.post('/loginAdmin',LoginAdminController);
router.post('/updateAdmin/:adminId',UpdateAdminController )

export { router as AdminRouter };
