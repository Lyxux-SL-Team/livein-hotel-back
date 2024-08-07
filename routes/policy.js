import express from 'express';
import {
  createPolicyController,
  getPolicyController,
  updatePolicyController,
  deletePolicyController,
} from '../controllers/policy.js';

const router = express.Router();

router.post('/policy', createPolicyController);
router.get('/policy', getPolicyController);
router.put('/policy/:policyId', updatePolicyController);
router.delete('/policy/:policyId', deletePolicyController);

export {router as PolicyRouter}
