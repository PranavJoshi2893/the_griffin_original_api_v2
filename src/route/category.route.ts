import { Router } from "express";
import * as categoryController from "../controller/category.controller";

const router = Router();

router.route("/").post(categoryController.createCategory);
router.route("/:id").get(categoryController.getCategory);
router.route("/").get(categoryController.getAllCategories);
router.route("/:id").patch(categoryController.updateCategory);
router.route("/:id").delete(categoryController.deleteCategory);

export default router;
