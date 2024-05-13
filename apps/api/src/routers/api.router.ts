import { Router } from 'express'
import { UserRouter } from './user.router'
import { EventRouter } from './event.router'
import { OrganizerRouter } from './organizer.router'


export class ApiRouter {
    private userRouter: UserRouter
    private organizerRouter: OrganizerRouter
    private eventRouter: EventRouter
    private router: Router

    constructor() {
        this.router = Router()
        this.userRouter = new UserRouter()
        this.organizerRouter = new OrganizerRouter()
        this.eventRouter = new EventRouter()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.use('/users', this.userRouter.getRouter())
        this.router.use('/organizers', this.organizerRouter.getRouter())
        this.router.use('/events', this.eventRouter.getRouter())
    }

    getRouter() {
        return this.router
    }
}