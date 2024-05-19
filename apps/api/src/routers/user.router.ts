import { UserController } from '@/controllers/user.controller';
import { uploader } from '@/helpers/uploader';
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
        this.router.get('/profile', this.verifyToken.verifyToken, this.userController.getSession)
        this.router.post('/updateemail', this.verifyToken.verifyToken, this.userController.userEmail)
        this.router.patch('/verifyupdateemail', this.verifyToken.verifyToken, this.userController.userEmailVerification)
        this.router.patch('/updateimage', uploader("", "/uploads").single("file"), this.verifyToken.verifyToken, this.userController.userUpdateImage)
        this.router.patch('/updateusername', this.verifyToken.verifyToken, this.userController.userUpdateUsername)
        this.router.patch('/updatefirstname', this.verifyToken.verifyToken, this.userController.userUpdateFirstname)
        this.router.patch('/updatelastname', this.verifyToken.verifyToken, this.userController.userUpdateLastname)
        this.router.patch('/updatepassword', this.verifyToken.verifyToken, this.userController.userUpdatePassword)

    }

    getRouter(): Router {
        return this.router
    }
} 

