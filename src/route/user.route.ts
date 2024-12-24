import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.route("/").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/").get(userController.getAllUsers);
router.route("/:id").delete(userController.deleteUser);
router.route("/:id").get(userController.getUser);
router.route("/:id").patch(userController.updateUser);

export default router;
