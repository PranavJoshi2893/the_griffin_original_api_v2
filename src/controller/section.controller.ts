import { Request, Response } from "express";
import { AppError } from "../utils/error";
import * as sectionService from "../service/section.service";

async function createSection(req: Request, res: Response) {
  try {
    const result = await sectionService.createSection(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSection(req: Request, res: Response) {
  try {
    const result = await sectionService.getSection(
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

async function getAllSections(req: Request, res: Response) {
  try {
    const result = await sectionService.getAllSections();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateSection(req: Request, res: Response) {
  try {
    const result = await sectionService.updateSection(
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

async function deleteSection(req: Request, res: Response) {
  try {
    const result = await sectionService.deleteSection(
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

export { createSection, getSection, getAllSections, updateSection, deleteSection };
