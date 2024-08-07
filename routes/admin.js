import express from 'express';
import { CheckAdminEmailController,CreateAdminController,LoginAdminController,UpdateAdminController,CheckAdminIdController  } from '../controllers/admin.js';

import authenticateUser from "../middleware/authenticateUser.js"

const router = express.Router();

router.post('/checkEmail', CheckAdminEmailController);
router.post('/createAdmin',CreateAdminController);
router.post('/loginAdmin',LoginAdminController);
router.post('/updateAdmin/:adminId',authenticateUser,UpdateAdminController );
router.get('/checkAdmin/:adminId', CheckAdminIdController);

export { router as AdminRouter };
