import { Router } from "express";
import * as sectionController from "../controller/section.controller";

const router = Router();

router.route("/").post(sectionController.createSection);
router.route("/:id").get(sectionController.getSection);
router.route("/").get(sectionController.getAllSections);
router.route("/:id").patch(sectionController.updateSection);
router.route("/:id").delete(sectionController.deleteSection);

export default router;
