import express from 'express';
import FineController from '../controllers/fineController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

const fineController = new FineController();

router.get('/agreements/:agreementId/fines/:fineId', checkAuth, fineController.getFineById.bind(fineController));
router.get('/agreements/:agreementId/fines', checkAuth, fineController.getFines.bind(fineController));
router.post('/agreements/:agreementId/fines', checkAuth, fineController.createFine.bind(fineController));
router.post(
  '/agreements/:agreementId/fines/fill-db/csv',
  checkAuth,
  fineController.createFinesFromCSV.bind(fineController)
);
router.put('/agreements/:agreementId/fines/:fineId', checkAuth, fineController.updateFine.bind(fineController));
router.delete('/agreements/:agreementId/fines/:fineId', checkAuth, fineController.closeFine.bind(fineController));

export default router;
