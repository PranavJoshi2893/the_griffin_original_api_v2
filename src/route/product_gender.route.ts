import { Router } from "express";
import * as productGenderController from "../controller/product_gender.controller";

const router = Router();

router.route("/").post(productGenderController.createGender);
router.route("/:id").get(productGenderController.getGender);
router.route("/").get(productGenderController.getAllGender);
router.route("/:id").patch(productGenderController.updateGender);
router.route("/:id").delete(productGenderController.deleteGender);

export default router;
