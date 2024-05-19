import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class UserMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            // console.log(req.headers.cookie?.replace("session=", ""));
            
            // let token = req.headers.authorization?.replace("Bearer ", "")
            let token = req.headers.cookie?.replace("session=", "")
            if (!token) throw "Token Empty"
            let tokenSplit = token.split(';')[0]
            console.log(tokenSplit)

            const verifyUser = verify(tokenSplit, process.env.KEY_JWT!)
            req.user = verifyUser as User

            next()
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            })
        }
    }
    checkOrganizer(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.isOrganizer === false) throw "Unauthorized! (organizer only!)"
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            })
        }
    }
}