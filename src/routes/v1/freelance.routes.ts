import { Router } from "express";
import { getAllFreelances } from "../../controllers/freelance.controller";

const router = Router();

router.get('/', getAllFreelances);

export { router as freelanceRoute };
