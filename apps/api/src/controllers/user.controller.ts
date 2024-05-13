import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '@/helpers/nodemailer';

const prisma = new PrismaClient();

export class UserController {
  //create user start here
  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, firstName, lastName, referralCode } = req.body;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      let existedUser;

      if (
        referralCode !== undefined &&
        referralCode !== null &&
        referralCode !== ''
      ) {
        const referredUser = await prisma.user.findUnique({
          where: {
            referralCode,
          },
        });

        if (!referredUser) throw 'Wrong referral code';
        existedUser = await prisma.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: hashPassword,
          },
        });
      } else {
        existedUser = await prisma.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: hashPassword,
          },
        });
      }

      const payload = {
        id: existedUser?.id,
        referralCode: referralCode || null,
        username: existedUser?.username,
      };

      const token = sign(payload, process.env.KEY_JWT!);
      const link = `http://localhost:3000/verify_as_user/${token}`;
      const templatePath = path.join(
        __dirname,
        '../templates',
        'register.html',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledtemplate = handlebars.compile(templateSource);
      const html = compiledtemplate({
        firstName: existedUser?.firstName,
        lastName: existedUser?.lastName,
        link,
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER!,
        to: existedUser?.email,
        subject: 'Verify as User',
        html,
      });

      res.status(201).send({
        status: 'ok',
        message: 'user created!',
        user: existedUser,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
  //create user end here

  //activating user start here

  async userActivate(req: Request, res: Response) {
    try {
      const refcode = req.user?.username! + req.user?.id;
      const activateUser = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          isActive: true,
          referralCode: refcode,
        },
      });

      if (req.user?.referralCode) {
        const reffUser = await prisma.user.findUnique({
          where: {
            referralCode: req.user?.referralCode,
          },
        });
        if (!reffUser) throw 'Wrong referral code';
        await prisma.point.create({
          data: {
            amount: 10000,
            expirationDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
            userId: reffUser.id
          },
        });
        await prisma.discount.create({
          data: {
            disocount: 10,
            expirationDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
            userId: req.user.id
          },
        });
      }
      res.json(activateUser);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  //user login here
  async userLogin(req: Request, res: Response) {
    try {
      const { data, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username: data }, { email: data }],
        },
      });
      
      if (!user) throw new Error ('User not found')
      
      const isValidPassword = await compare(password, user.password)
      
      if (!isValidPassword) throw 'Incorrect Password';

      const payload = {
        id: user.id,
        isActive: user.isActive
      };

      const token = sign(payload, process.env.KEY_JWT!)

      res.status(200).send({
        status: 'ok',
        message: 'User Logged in',
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
}
