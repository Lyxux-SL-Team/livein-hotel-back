import express from 'express';
import { saveContractController, getContractsByAdminController } from '../controllers/contract.js'; 
const router = express.Router();
// Route to save a new contract
router.post('/contracts', saveContractController);

// Route to get contracts by adminId
router.get('/contracts/admin/:adminId', getContractsByAdminController);

export {router as ContractRoute};
