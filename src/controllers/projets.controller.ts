import { Request, Response, NextFunction } from 'express';
import prisma from '../orm/client';

export const getProjetsOuverts = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<any> => {
    try {
        const projets = await prisma.projet.findMany({
            where: {
                statut: 'OUVERT' // On filtre uniquement ceux qui sont ouverts
            },
            include: {
                entreprise: {
                    select: { nom: true, secteur: true } // On récupère le nom de l'entreprise pour l'affichage
                }
            }
        });

        res.status(200).json(projets);
    } catch (error) {
        next(error);
    }
};