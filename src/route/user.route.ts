import { Router } from "express";
import * as userController from "../controller/user.controller";
import at_verification from "../middleware/at_verification.middleware";
import rt_verification from "../middleware/rt_verification.middleware";

const router = Router();

router.route("/").post(at_verification, userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/").get(at_verification, userController.getAllUsers);
router.route("/:id").delete(at_verification, userController.deleteUser);
router.route("/:id").get(at_verification, userController.getUser);
router.route("/:id").patch(at_verification, userController.updateUser);
router.route("/refresh").post(rt_verification, userController.refresh);

export default router;
