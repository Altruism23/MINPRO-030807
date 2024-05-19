import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '@/helpers/nodemailer';
import { uploader } from '@/helpers/uploader';

const prisma = new PrismaClient();

export class OrganizerController {
  //create organizer start here
  async createOrganizer(req: Request, res: Response) {
    try {
      const { organizerName, email, password, image } = req.body;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const imageUrl = req.file
        ? `http://localhost:8000/public/uploads/${req.file.filename}`
        : null;

      const newOrganizer = await prisma.organizer.create({
        data: {
          ...req.body,
          password: hashPassword,
          image: imageUrl,
        },
      });

      const payload = {
        id: newOrganizer.id,
        organizerName: newOrganizer.organizerName,
      };

      const token = sign(payload, process.env.KEY_JWT!);
      const link = `http://localhost:3000/verify/${token}`;
      const templatePath = path.join(
        __dirname,
        '../templates',
        'organizer.html',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledtemplate = handlebars.compile(templateSource);
      const html = compiledtemplate({
        organizerName: newOrganizer.organizerName,
        link,
      });
      await transporter.sendMail({
        from: process.env.MAIL_USER!,
        to: newOrganizer.email,
        subject: 'verify as Organizer',
        html,
      });
      res.status(201).send({
        status: 'ok',
        message: 'organizer created!',
        organizer: newOrganizer,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'ok',
        message: err,
      });
    }
  }
  // create organizer end here

  // activating organizer start here
  async organizerActivate(req: Request, res: Response) {
    try {
      const activateOrganizer = await prisma.organizer.update({
        where: { id: req.organizer?.id },
        data: { isActive: true },
      });
      res.status(200).send({
        status: 'ok',
        activateOrganizer,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async organizerLogin(req: Request, res: Response) {
    try {
      const { data, password } = req.body;
      const organizer = await prisma.organizer.findFirst({
        where: {
          OR: [{ organizerName: data }, { email: data }],
        },
      });

      console.log(req.body);
      if (!organizer) throw new Error('Organizer not found');

      const isValidPassword = await compare(password, organizer.password);
      if (!isValidPassword) throw 'Incorrect Password';

      const payload = {
        id: organizer.id,
        isActive: organizer.isActive,
        role: 'organizer',
      };
      const token = sign(payload, process.env.KEY_JWT!);

      res.status(200).send({
        status: 'ok',
        organizer,
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

  async organizerEmail(req: Request, res: Response) {
    try {
      const organizer = await prisma.organizer.findUnique({
        where: {
          id: req.organizer?.id,
        },
      });
      if (organizer?.email !== req.body.email) {
        const payload = {
          id: organizer?.id,
          email: req.body.email,
          role: 'organizer',
        };
        const token = sign(payload, process.env.KEY_JWT!);
        const link = `http://localhost:3000/update_email_organizer/${token}`;
        const templatePath = path.join(
          __dirname,
          '../templates',
          'updateEmailOrganizer.html',
        );
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const compiledtemplate = handlebars.compile(templateSource);
        const html = compiledtemplate({
          organizerName: organizer?.organizerName,
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
          message:
            'email verification has been sent to your new email. Please check your new email to verify it',
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
        message: err,
      });
    }
  }

  async organizerEmailVerification(req: Request, res: Response) {
    try {
      const organizer = await prisma.organizer.findUnique({
        where: {
          id: req.organizer?.id,
        },
      });
      const updateOrganizer = await prisma.organizer.update({
        where: { id: organizer?.id },
        data: { email: req.organizer?.email },
      });

      res.status(200).send({
        status: 'ok',
        message: 'Email updated successfully',
        email: updateOrganizer.email,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async organizerUpdateImage(req: Request, res: Response) {
    try {
      const organizer = await prisma.organizer.findUnique({
        where: {
          id: req.organizer?.id,
        },
      });
      if (!organizer) throw 'Not an organizer';

      const file = req.file;
      if (!file) throw 'No file was uploaded';
      const imageUrl = `http://localhost:8000/public/uploads/${req.file?.filename}`;
      await prisma.organizer.update({
        where: {
          id: req.organizer?.id,
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

  async organizerUpdateProfile(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { organizerName } = req.body;
      let organizer = await prisma.organizer.findUnique({
        where: {
          id: req.organizer?.id,
        },
      });
      if (!organizer) throw 'Organizer was not found';
      organizer = await prisma.organizer.update({
        where: {
          id: req.organizer?.id,
        },
        data: {
          organizerName: organizerName,
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'organizer name updated!',
        organizer,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async organizerUpdatePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const salt = await genSalt(10)
      const hashPassword = await hash(password, salt)
      const organizer = await prisma.organizer.findUnique({
        where: { id: req.organizer?.id },
      });
      if (!organizer) throw 'Organizer not found';
      await prisma.organizer.update({
        where: { id: req.organizer?.id },
        data: {
          password: hashPassword
        },
      });
      res.status(200).send({
        status: 'ok',
        message: 'Password Updated!',
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
      const session = await prisma.organizer.findUnique({
        where: {
          id: req.organizer?.id,
        },
        select: {
          organizerName: true,
          email: true,
          image: true,
          isUser: true
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
