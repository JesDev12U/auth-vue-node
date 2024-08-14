import { Router } from "express";
import cAuth from "../controllers/cAuth.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = Router();

router.get("/", cAuth.init);
router.post("/login", cAuth.login);
router.post("/signin", cAuth.signin);
router.get("/protected", jwtAuth.verifyToken, (req, res) => {
  res.json({
    error: false,
    message: "Correct!",
  });
});
router.get("/refresh-token", jwtAuth.refreshToken);

export default router;
