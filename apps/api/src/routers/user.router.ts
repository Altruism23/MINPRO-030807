import { UserController } from '@/controllers/user.controller';
import { UserMiddleware } from '@/middlewares/user.middleware';
import { Router } from 'express'

export class UserRouter {
    private router: Router;
    private userController: UserController;
    private verifyToken: UserMiddleware

    constructor() {
        this.router = Router()
        this.userController = new UserController()
        this.verifyToken = new UserMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/', this.userController.createUser)
        this.router.get("/verifyuser", this.verifyToken.verifyToken, this.userController.userActivate)
        this.router.post('/login', this.userController.userLogin)

    }

    getRouter(): Router {
        return this.router
    }
} 

