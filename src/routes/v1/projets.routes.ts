import { Router } from 'express';
import { getProjetsOuverts } from '../../controllers/projets.controller';

const router = Router();

// Route : GET /v1/projets/ouverts
router.get('/ouverts', getProjetsOuverts);

export { router as projetsRouter };