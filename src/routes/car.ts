import express from 'express';
import CarController from '../controllers/carController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

const carController = new CarController();

router.get('/cars/:carId', checkAuth, carController.getCarById.bind(carController));
router.get('/cars', checkAuth, carController.getCars.bind(carController));
router.post('/cars', checkAuth, carController.createCar.bind(carController));
router.post('/cars/fill-db/csv', checkAuth, carController.createCarsFromCSV.bind(carController));
router.put('/cars/:carId', checkAuth, carController.updateCar.bind(carController));
router.delete('/cars/:carId', checkAuth, carController.deleteCar.bind(carController));

export default router;
