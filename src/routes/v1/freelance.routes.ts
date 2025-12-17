import { Router } from "express";
import { createFreelance, getAllFreelances, getFreelanceById } from "../../controllers/freelance.controller";

const router = Router();

router.get('/', getAllFreelances);
router.get('/:id', getFreelanceById);
router.post('/create', createFreelance);

export { router as freelanceRoute };
