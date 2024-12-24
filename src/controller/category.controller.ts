import { Request, Response } from "express";
import * as categoryService from "../service/category.service";
import { AppError } from "../utils/error";

async function createCategory(req: Request, res: Response) {
  try {
    const result = await categoryService.createCategory(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCategory(req: Request, res: Response) {
  try {
    const result = await categoryService.getCategory(
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

async function getAllCategories(req: Request, res: Response) {
  try {
    const result = await categoryService.getAllCategories();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateCategory(req: Request, res: Response) {
  try {
    const result = await categoryService.updateCategory(
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

async function deleteCategory(req: Request, res: Response) {
  try {
    const result = await categoryService.deleteCategory(
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

export {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
