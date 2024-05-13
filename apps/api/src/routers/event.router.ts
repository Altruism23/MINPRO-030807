import { EventController } from '@/controllers/events.controller';
import {Router} from 'express'
import { uploader } from '@/helpers/uploader';
import { OrganizerMiddleware } from '@/middlewares/organizer.middleware';

export class EventRouter{
    private router: Router;
    private eventController: EventController
    private organizerMiddleware: OrganizerMiddleware



    constructor() {
        this.router = Router()
        this.eventController = new EventController()
        this.organizerMiddleware = new OrganizerMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/', uploader("","/uploads").single('file'), this.organizerMiddleware.verifyToken,this.eventController.createEvent)
    }
    
    getRouter(): Router {
        return this.router
    }
}