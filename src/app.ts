import express from "express";
import productGenderRoute from "./route/product_gender.route";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/product_gender", productGenderRoute);

export default app;
