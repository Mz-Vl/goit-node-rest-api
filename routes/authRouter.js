import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/authSchemas.js";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateAvatar, upload } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/current", authMiddleware, getCurrentUser);
authRouter.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

export default authRouter;
