import { Router } from "express";
import { createFreelance, getAllFreelances,   } from "../../controllers/freelance.controller";

const router = Router();

router.get('/', getAllFreelances);
router.post('/', createFreelance);

export { router as freelanceRoute };
