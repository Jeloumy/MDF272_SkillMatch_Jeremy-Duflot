import { NextFunction } from "connect";
import { Request, Response } from 'express';
import { prisma } from "../orm/client";
import { FreelancePayload, CreateFreelanceDtoInputs } from '../dtos/freelance.dto';


export const getAllFreelances = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const freelances: FreelancePayload[] = await prisma.freelance.findMany();
        res.status(200).json(freelances);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des freelances.' });
        next();
    }
}; 

export const createFreelance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as CreateFreelanceDtoInputs; 
        const existingFreelance = await prisma.freelance.findUnique({
            where: { email: body.email }
        });

        if (existingFreelance) {
            return res.status(400).json({ message: 'Un freelance avec cet email existe déjà.' });
        } else {
        const newFreelance = await prisma.freelance.create({
            data: body
        });
        res.status(201).json(newFreelance);
        }

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la création du freelance.' });
        next();
    }   
};
