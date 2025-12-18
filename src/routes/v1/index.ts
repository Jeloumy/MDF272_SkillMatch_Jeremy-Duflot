import { Router } from "express";
import { freelanceRoute } from "./freelance.routes";
import { entrepriseRoute } from "./entreprise.route";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "API SkillMatch est en ligne ! 🚀" });
});
router.use('/freelances', freelanceRoute);
router.use('/entreprises', entrepriseRoute);
export { router as V1Route };
