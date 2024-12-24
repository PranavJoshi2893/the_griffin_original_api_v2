import { Router } from "express";
import * as categoryController from "../controller/category.controller";
import at_verification from "../middleware/at_verification.middleware";

const router = Router();

router.route("/").post(at_verification, categoryController.createCategory);
router.route("/:id").get(at_verification, categoryController.getCategory);
router.route("/").get(at_verification, categoryController.getAllCategories);
router.route("/:id").patch(at_verification, categoryController.updateCategory);
router.route("/:id").delete(at_verification, categoryController.deleteCategory);

export default router;
