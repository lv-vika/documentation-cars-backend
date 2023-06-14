import express from 'express';
import ClientController from '../controllers/clientController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

const clientController = new ClientController();

router.get('/clients/:clientId', checkAuth, clientController.getClientById.bind(clientController));
router.get('/clients', checkAuth, clientController.getClients.bind(clientController));
router.post('/clients', checkAuth, clientController.createClient.bind(clientController));
router.post('/clients/fill-db/csv', checkAuth, clientController.createClientsFromCSV.bind(clientController));
router.put('/clients/:clientId', checkAuth, clientController.updateClient.bind(clientController));
router.delete('/clients/:clientId', checkAuth, clientController.deleteClient.bind(clientController));

export default router;
