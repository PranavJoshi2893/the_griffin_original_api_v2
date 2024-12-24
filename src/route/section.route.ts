import { Router } from "express";
import * as sectionController from "../controller/section.controller";
import at_verification from "../middleware/at_verification.middleware";

const router = Router();

router.route("/").post(at_verification, sectionController.createSection);
router.route("/:id").get(at_verification, sectionController.getSection);
router.route("/").get(at_verification, sectionController.getAllSections);
router.route("/:id").patch(at_verification, sectionController.updateSection);
router.route("/:id").delete(at_verification, sectionController.deleteSection);

export default router;
