import { Router } from "express";
import { createFreelance, getAllFreelances, getCompatibleProjets, getFreelanceById, getProjetsScoreCompatibles, postulerProjet } from "../../controllers/freelance.controller";

const router = Router();

router.get('/', getAllFreelances);
router.get('/:fId', getFreelanceById);
router.post('/create', createFreelance);
router.get('/:fId/projets-compatibles', getCompatibleProjets);
router.post('/:fId/postuler/:pId', postulerProjet);
router.get('/:fId/projets-compatibles-score', getProjetsScoreCompatibles);

export { router as freelanceRoute };

