import { Request, Response } from "express";
import { AppError } from "../utils/error";
import * as userService from "../service/user.service";

async function registerUser(req: Request, res: Response) {
  try {
    const result = await userService.registerUser(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const result = await userService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { registerUser, loginUser };
