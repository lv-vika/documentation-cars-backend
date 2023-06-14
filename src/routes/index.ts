import express from 'express';

import authRoutes from './auth';
import clientRoutes from './client';
import agreementRoutes from './agreement';
import carRoutes from './car';
import fineRoutes from './fine';

const router = express.Router();

router.use(authRoutes);
router.use(clientRoutes);
router.use(agreementRoutes);
router.use(carRoutes);
router.use(fineRoutes);

export default router;
