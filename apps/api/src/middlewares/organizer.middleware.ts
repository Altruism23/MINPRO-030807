import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class OrganizerMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization?.replace("Bearer ", "")
            if (!token) throw "Token Empty"

            const verifyOrganizer = verify(token, process.env.KEY_JWT!)
            req.organizer = verifyOrganizer as Organizer

            next()
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            })
        }
    }
}