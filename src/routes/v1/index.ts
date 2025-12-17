import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "API SkillMatch est en ligne ! 🚀" });
});

export { router as V1Route };
