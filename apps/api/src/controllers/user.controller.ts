import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import {genSalt, hash, compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password, ReferralCode } = req.body;
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt)

        const user = await prisma.user.create({
            data: {
                ...req.body,
                password: hashPassword,
            }
        })
        
        const userRefCode = await prisma.referral.findUnique({
            where: {
                referralCode: ReferralCode
            }
        })
        if (userRefCode) {
            
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: "error",
            message: err
        })
    }
}