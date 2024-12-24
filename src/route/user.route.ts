import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.route("/").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

export default router;
