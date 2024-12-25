import express from "express";
import cors from "cors";
import categoryRoute from "./route/category.route";
import userRoute from "./route/user.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/users", userRoute);

export default app;
