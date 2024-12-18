import { Request, Response } from "express";
import { AppError } from "../utils/error";
import * as productGenderService from "../service/product_gender.service";

async function createGender(req: Request, res: Response) {
  try {
    const result = await productGenderService.createGender(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getGender(req: Request, res: Response) {
  try {
    const result = await productGenderService.getGender(
      parseInt(req.params["id"])
    );

    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllGender(req: Request, res: Response) {
  try {
    const result = await productGenderService.getAllGender();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateGender(req: Request, res: Response) {
  try {
    const result = await productGenderService.updateGender(
      req.body,
      parseInt(req.params["id"])
    );
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteGender(req: Request, res: Response) {
  try {
    const result = await productGenderService.deleteGender(
      parseInt(req.params["id"])
    );
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { createGender, getGender, getAllGender, updateGender, deleteGender };
