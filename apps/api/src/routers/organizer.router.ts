import { OrganizerController } from "@/controllers/organizer.controller";
import { OrganizerMiddleware } from "@/middlewares/organizer.middleware";
import { uploader } from "@/helpers/uploader";
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
        this.router.get('/profile', this.verifyToken.verifyToken, this.organizerController.getSession)
        this.router.post('/updateemail', this.verifyToken.verifyToken, this.organizerController.organizerEmail)
        this.router.patch('/verifyupdateemail', this.verifyToken.verifyToken, this.organizerController.organizerEmailVerification)
        this.router.patch('/updateimage', uploader("","/uploads").single("file"), this.verifyToken.verifyToken, this.organizerController.organizerUpdateImage)
        this.router.patch('/updateprofile', this.verifyToken.verifyToken, this.organizerController.organizerUpdateProfile)
        this.router.patch('/updatepassword', this.verifyToken.verifyToken, this.organizerController.organizerUpdatePassword)
    }
    
    getRouter(): Router {
        return this.router
    }
}