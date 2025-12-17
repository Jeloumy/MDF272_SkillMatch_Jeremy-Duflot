import { Router } from "express";
import { createFreelance, getAllFreelances, getCompatibleProjets, getFreelanceById } from "../../controllers/freelance.controller";

const router = Router();

router.get('/', getAllFreelances);
router.get('/:id', getFreelanceById);
router.post('/create', createFreelance);
router.get('/:id/projets-compatibles', getCompatibleProjets);

export { router as freelanceRoute };

