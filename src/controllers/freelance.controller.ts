import { NextFunction } from "connect";
import { Request, Response } from 'express';
import { prisma } from "../orm/client";
import { FreelancePayload } from '../dtos/freelance.dto';


export const getAllFreelances = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const freelances: FreelancePayload[] = await prisma.freelance.findMany();
        res.status(200).json(freelances);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des freelances.' });
        next();
    }
}; 
