import express from 'express';
import { createEvent, getAllEvents, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.delete('/:id', deleteEvent);

export default router;
