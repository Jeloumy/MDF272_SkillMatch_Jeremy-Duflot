import { Request , Response } from 'express';
import { NextFunction } from "connect";
import { prisma } from "../orm/client";
import { EntreprisePayload, CreateEntrepriseDtoInputs, CreateProjetDtoInputs } from '../dtos/entreprise.dto';


export const getAllEntreprises = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const entreprises: EntreprisePayload[] = await prisma.entreprise.findMany(); 
        res.status(200).json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des entreprises.' });
        next();
    }
};

export const createEntreprise = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const body = req.body as CreateEntrepriseDtoInputs;
        const entreprise = await prisma.entreprise.create({
            data: body
        });
        res.status(201).json(entreprise);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la création de l\'entreprise.' });
        next();
    }
};

export const getEntrepriseById = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { eId } = req.params;
        const entreprise = await prisma.entreprise.findUnique({
            where: { id: parseInt(eId) }
        });

        if(!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée.' });
        }
        res.status(200).json((entreprise));
    } catch (error) {
        next(error);
    }  
};

export const createProjetForEntreprise = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { eId } = req.params;
        const body = req.body as CreateProjetDtoInputs;
        const entreprise = await prisma.entreprise.findUnique({
            where: { id: parseInt(eId) }
        });

        if(!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée.' });
        }

        const projet = await prisma.projet.create({
            data: {
                ...body,
                entrepriseId: parseInt(eId)
            }
        });

        res.status(201).json(projet);
    } catch (error) {
        next(error);
    }
};

export const getProjetsByEntreprise = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { eId } = req.params;
        const entreprise = await prisma.entreprise.findUnique({
            where: { id: parseInt(eId) }
        });
        if(!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée.' });
        }
        const projets = await prisma.projet.findMany({
            where: { entrepriseId: parseInt(eId) }
        });
        res.status(200).json(projets);
    }
    catch (error) {
        next(error);
    }       
};

export const getCandidatsCompatibles = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try { 
        const { pId } = req.params;
        const projet = await prisma.projet.findUnique({
            where: { id: parseInt(pId) }
        });
        if (!projet) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        const projetSkillsLower = projet.skillsRequis.map(skill => skill.toLowerCase());
        const freelances = await prisma.freelance.findMany();
        const candidatsCompatibles = freelances.filter(freelance => {
            const freelanceSkillsLower = freelance.skills.map(skill => skill.toLowerCase());
            const hasAllSkills = projetSkillsLower.every(skill => freelanceSkillsLower.includes(skill))
            return hasAllSkills;
        });

        if (candidatsCompatibles.length === 0) {
            return res.status(404).json({ message: 'Aucun candidat compatible trouvé pour ce projet.' });
        }
        res.status(200).json(candidatsCompatibles);
    } catch (error) {
        next(error);
    }
};