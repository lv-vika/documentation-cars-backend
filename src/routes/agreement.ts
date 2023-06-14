import express from 'express';
import AgreementController from '../controllers/agreementController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

const agreementController = new AgreementController();

router.get('/agreements/:agreementId', checkAuth, agreementController.getAgreementById.bind(agreementController));
router.get('/agreements', checkAuth, agreementController.getAgreementsForClient.bind(agreementController));
router.post('/agreements', checkAuth, agreementController.issueAgreement.bind(agreementController));
router.post(
  '/agreements/fill-db/csv',
  checkAuth,
  agreementController.createAgreementsFromCSV.bind(agreementController)
);
router.put('/agreements/:agreementId', checkAuth, agreementController.closeAgreement.bind(agreementController));
router.delete('/agreements/:agreementId', checkAuth, agreementController.deleteAgreement.bind(agreementController));

export default router;
