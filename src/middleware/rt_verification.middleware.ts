import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function rt_verification(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid Bearer token" });
  }

  if (!process.env.REFRESH_TOKEN_SECRET) {
    return res.status(400).json({ error: "Invalid Environment Variable" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    if (data === undefined || typeof data === "string") {
      return res.status(404).json({ error: "Invalid Payload" });
    }

    req.body["sub"] = data.sub;

    next();
  });
}

export default rt_verification;
