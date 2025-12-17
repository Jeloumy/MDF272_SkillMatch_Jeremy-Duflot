import { NextFunction } from "connect";
import { Request, Response } from 'express';
import { prisma } from "../orm/client";
import { FreelancePayload, CreateFreelanceDtoInputs } from '../dtos/freelance.dto';


export const getAllFreelances = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const freelances: FreelancePayload[] = await prisma.freelance.findMany();
        res.status(200).json(freelances);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des freelances.' });
        next();
    }
}; 

export const createFreelance = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
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

export const getFreelanceById = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { fId } = req.params;
        const freelance = await prisma.freelance.findUnique({
            where: { id: parseInt(fId) }
        });

        if(!freelance) {
            return res.status(404).json({ message: 'Freelance non trouvé.' });
        }
        res.status(200).json((freelance));
    } catch (error) {
        next(error);
    }
};

export const getCompatibleProjets = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { fId } = req.params;
        const freelance = await prisma.freelance.findUnique({
            where: { id: parseInt(fId) }
        });
        if (!freelance) {
            return res.status(404).json({ message: 'Freelance non trouvé.' });
        }
        const freelanceSkillsLower = freelance.skills.map(skill => skill.toLowerCase());
        const projets = await prisma.projet.findMany();
        const FreelanceCompatibleProjets = projets.filter(projet => {
            const projetSkillsLower = projet.skillsRequis.map(skill => skill.toLowerCase());
            const hasAllSkills = projetSkillsLower.every(skill => freelanceSkillsLower.includes(skill))
            return hasAllSkills;
        });

        if (FreelanceCompatibleProjets.length === 0) {
            return res.status(404).json({ message: 'Aucun projet compatible trouvé pour ce freelance.' });
        }
        res.status(200).json(FreelanceCompatibleProjets);
    } catch (error) {
        next(error);
    }  
};

export const postulerProjet = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const { fId, pId } = req.params;
        const freelanceId = parseInt(fId);
        const projetId = parseInt(pId);
        const freelance = await prisma.freelance.findUnique({
            where: { id: freelanceId }
        });
        const projet = await prisma.projet.findUnique({
            where: { id: projetId }
        });
        if (!freelance) {
            return res.status(404).json({ message: 'Freelance non trouvé.' });
        }
        if (!projet) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        const freelanceSkillsLower = freelance.skills.map(skill => skill.toLowerCase());
        const projetSkillsLower = projet.skillsRequis.map(skill => skill.toLowerCase());
        const hasAllSkills = projetSkillsLower.every(skill => freelanceSkillsLower.includes(skill));

        if (!hasAllSkills) {
            return res.status(400).json({ resultat: "Candidature REFUSÉE", motif: "Compétences manquantes", skills_freelance: freelance.skills, skills_requises: projet.skillsRequis
            });
        }

        if (freelance.tjm > projet.budgetMaxTjm) {
            return res.status(400).json({ resultat: "Candidature REFUSÉE", motif: "TJM trop élevé", tjm_freelance: freelance.tjm, budget_max_projet: projet.budgetMaxTjm
            });
        }

        return res.status(200).json({ resultat: "Candidature ACCEPTÉE", motif: "Le freelance répond aux critères du projet", freelance : freelance.nom, projet: projet.titre});

    } catch (error) {
        next(error);
    }
};