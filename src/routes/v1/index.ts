import { Router } from "express";
import { freelanceRoute } from "./freelance.routes";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "API SkillMatch est en ligne ! 🚀" });
});
router.use('/freelances', freelanceRoute);
export { router as V1Route };
