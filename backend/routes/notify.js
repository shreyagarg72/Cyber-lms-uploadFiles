import express from 'express';
import { getAllNotifications, createNotification, clearNotifications } from '../controllers/notifyController.js';

const router = express.Router();

router.get('/', getAllNotifications);
router.post('/', createNotification);
router.post('/clear', clearNotifications);

export default router;
