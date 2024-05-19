import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploader } from '@/helpers/uploader';
import { connect } from 'formik';
import prisma from '@/prisma';


export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        where: {
          organizerId: req.organizer?.id
        }
      });
      res.status(200).send({
        status: 'ok',
        events,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const { name, description, price, location, organizerId } = req.body;
      const imageUrl = req.file ? `http://localhost:8000/public/uploads/${req.file.filename}` : null;
      const slug = req.body.name.toLowerCase().replaceAll(" ", "-")
      if (!name || !description || !price || !location) {
        throw new Error('Missing required fields');
      }
    
      console.log(req.organizer)
      const newEvent = await prisma.event.create({
        data: {
          ...req.body,
          price: +price,
          organizer: {
            connect: {
              id: req.organizer?.id
            }
          },
          image: imageUrl,
          slug
        },
      });
      res.status(201).send({
        status: 'ok',
        message: 'event created!',
        newEvent,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'error',
        Message: err,
      });
    }
  }

  async getEventSlug (req: Request, res: Response) {
    try {
      const details = await prisma.event.findUnique({
        where: {
          slug: req.params.slug
        }
      })
      res.status(200).send({
        status: 'ok',
        details: {
          ...details
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        status: 'error',
        message: err
      })
    }
  }

  async imageRequest(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) throw 'No file was uploaded';
      const imageUrl = `http://localhost:8000/public/uploads/${file.filename}`;
      await prisma.event.update({
        where: {
          id: req.event?.id,
        },
        data: {
          image: imageUrl,
        },
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
