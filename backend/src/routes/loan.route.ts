import { Router } from 'express';
import {
  createLoan,
  getLoansByRole,
  getLoansByIdNumber,
  updateLoanStatusVerifier,
  updateLoanStatusAdmin,
  getLoanSummary,
} from '../controllers/loan.controller';

const router = Router();

// Define the routes
router.post('/loans', createLoan);
router.get('/loans', getLoansByRole);
router.get('/loans/id', getLoansByIdNumber);
router.patch('/loans/status-verifier', updateLoanStatusVerifier);
router.patch('/loans/status-admin', updateLoanStatusAdmin);
router.get('/loans/summary', getLoanSummary);

export default router;
