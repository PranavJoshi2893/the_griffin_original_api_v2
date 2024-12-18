import express from "express";
import sectionRoute from "./route/section.route";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/section", sectionRoute);

export default app;
