import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class OrganizerMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            // console.log(req.headers)
            // let token = req.headers.authorization?.replace("Bearer ", "")
            let token = req.headers.cookie?.replace("session=", "")
            if (!token) throw "Token Empty"
            let tokenSplit = token.split(';')[0]
            // console.log(tokenSplit)

            const verifyOrganizer = verify(tokenSplit, process.env.KEY_JWT!)
            req.organizer = verifyOrganizer as Organizer

            next()
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            })
        }
    }
    checkUser (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.organizer?.isUser === false) throw "Unauthorized! (user only!)"
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }
}