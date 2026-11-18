/**
 * @class EventController
 * @description Handler for event
 */
export class EventController {
    constructor(eventService){
        this.eventService = eventService;
    }

    async createEvent(req, res) {
        try{
            const event = req.body;

            const notification = awaitthis.eventService.publishEvent(event);

            return res.status(202).json({
                notification
            });
        } catch (error) {
            return (error.message === 'Event is required.' || error.message.startsWith('Invalid event type:') ?
                res.status(400).json({error: error.message}) : res.status(500).json({error: "Internal server error."}));
        }
    }
}