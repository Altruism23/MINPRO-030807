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
      const { username, email, password, firstName, lastName, referralCode } =
        req.body;
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

      console.log(existedUser)

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
      console.log(req.user)
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
            userId: reffUser.id,
          },
        });
        await prisma.discount.create({
          data: {
            disocount: 10,
            expirationDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
            userId: req.user.id,
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

      if (!user) throw new Error('User not found');

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) throw 'Incorrect Password';

      const payload = {
        id: user.id,
        username: user.username,
        isActive: user.isActive,
        role: 'user',
      };

      const token = sign(payload, process.env.KEY_JWT!);

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

  //user update start here

  async userEmail(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (user?.email !== req.body.email) {
        const payload = {
          id: user?.id,
          email: req.body.email,
          role: 'user',
        };
        const token = sign(payload, process.env.KEY_JWT!);
        const link = `http://localhost:3000/update_email_user/${token}`;
        const templatePath = path.join(
          __dirname,
          '../templates',
          'updateEmailUser.html',
        );
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(templateSource);
        const html = compiledTemplate({
          username: user?.username,
          link,
        });

        await transporter.sendMail({
          from: process.env.MAIL_USER!,
          to: req.body.email,
          subject: 'Update Email',
          html,
        });
        res.status(200).send({
          status: 'ok',
          message: 'An email verification has been sent to your new email',
        });
      } else {
        res.status(200).send({
          status: 'ok',
          message: 'Email is the same, no update needed',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        messsage: err,
      });
    }
  }

  async userEmailVerification(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });

      if (!user) throw 'User not found';
      const updateUser = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: { email: req.user?.email },
      });
      res.status(200).send({
        status: 'ok',
        message: 'Email updated successfully',
        email: updateUser.email,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async userUpdateImage(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (!user) throw 'User not found';

      const file = req.file;
      if (!file) throw 'No file was uploaded';
      const imageUrl = `http://localhost:8000/public/uploads/${req.file?.filename}`;
      await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          image: imageUrl,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'Photo was updated!',
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async userUpdateUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      let user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (!user) throw 'User not found';
      user = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          username: username,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'username updated',
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async userUpdateFirstname(req: Request, res: Response) {
    try {
      const { firstName } = req.body;
      let user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (!user) throw 'User not found';
      user = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          firstName: firstName,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'User firstname updated',
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async userUpdateLastname(req: Request, res: Response) {
    try {
      const { lastName } = req.body;
      let user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (!user) throw 'User not found';
      user = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          lastName: lastName,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'user lastname updated!',
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async userUpdatePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const salt = await genSalt(10)
      const hashPassword = await hash(password, salt)
      let user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });
      if (!user) throw 'User not found';
      user = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          password: hashPassword,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'Password updated!',
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async getSession(req: Request, res: Response) {
    try {
      const session = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          image: true,
          referralCode: true,
          Point: true
        },
      });
      res.json(session);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }
}
