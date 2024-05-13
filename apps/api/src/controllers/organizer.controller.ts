import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '@/helpers/nodemailer';

const prisma = new PrismaClient();

export class OrganizerController {
  //create organizer start here
  async createOrganizer(req: Request, res: Response) {
    try {
      const { organizerName, email, password } = req.body;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const newOrganizer = await prisma.organizer.create({
        data: {
          ...req.body,
          password: hashPassword,
        },
      });

      const payload = {
        id: newOrganizer.id,
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
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async organizerLogin (req: Request, res: Response) {
    try {
      const {data, password} = req.body
      const organizer = await prisma.organizer.findFirst({
        where:{
          OR: [{organizerName: data}, {email: data}]
        }
      })

      console.log(req.body)
      if(!organizer) throw new Error ('Organizer not found')
      
      const isValidPassword = await compare(password, organizer.password)
      if (!isValidPassword) throw 'Incorrect Password'

      const payload = {
        id: organizer.id,
        isActive: organizer.isActive
      }
      const token = sign(payload, process.env.KEY_JWT!)

      res.status(200).send({
        status: "ok",
        organizer,
        token
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        status: "error",
        message: err
      })
    }
  }
}
