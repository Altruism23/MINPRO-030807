import { OrganizerController } from "@/controllers/organizer.controller";
import { OrganizerMiddleware } from "@/middlewares/organizer.middleware";
import {Router} from 'express'

export class OrganizerRouter{
    private router: Router;
    private organizerController: OrganizerController
    private verifyToken: OrganizerMiddleware

    constructor() {
        this.router = Router()
        this.organizerController = new OrganizerController()
        this.verifyToken = new OrganizerMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/', this.organizerController.createOrganizer)
        this.router.get('/verifyorganizer', this.verifyToken.verifyToken, this.organizerController.organizerActivate)
        this.router.post('/login', this.organizerController.organizerLogin)
    }
    
    getRouter(): Router {
        return this.router
    }
}