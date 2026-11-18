import { Router } from 'express';
import { EventController } from '../controllers/event.controller.js';
import { eventService } from '../config/notification.config.js';

const router = Router();

const eventController = new EventController(eventService);

router.post('/', (req, res) => {
    return eventController.createEvent(req, res);
});

export default router;