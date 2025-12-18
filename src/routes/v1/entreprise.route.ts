import Router from 'express';
import { createEntreprise, createProjetForEntreprise, getAllEntreprises, getCandidatsCompatibles, getEntrepriseById, getProjetsByEntreprise } from '../../controllers/entreprise.controller';

const router = Router();

router.get('/', getAllEntreprises);
router.get('/:eId', getEntrepriseById);
router.post('/create', createEntreprise);
router.post('/:eId/create-projets', createProjetForEntreprise);
router.get('/:eId/projets', getProjetsByEntreprise);
router.get('/:eId/projets/:pId/candidatscompatibles', getCandidatsCompatibles);

export { router as entrepriseRoute };