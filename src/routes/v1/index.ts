import { Router } from "express";
import { freelanceRoute } from "./freelance.routes";
import { entrepriseRoute } from "./entreprise.route";
import { projetsRouter } from "./projets.routes";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "API SkillMatch est en ligne ! 🚀" });
});
router.use('/freelances', freelanceRoute);
router.use('/entreprises', entrepriseRoute);
router.use('/projets', projetsRouter);

export { router as V1Route };
