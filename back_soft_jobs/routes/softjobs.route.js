import { softJobsController } from "../controllers/softjobs.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
  "/usuarios",
  authMiddleware,
  softJobsController.getUsuariosController,
);
router.post("/usuarios", softJobsController.postUsuariosController);
router.post("/login", softJobsController.postLoginController);

export default router;
