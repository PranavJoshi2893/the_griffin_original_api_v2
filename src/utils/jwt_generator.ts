import jwt from "jsonwebtoken";
import { BadRequestError } from "./error";

function accessTokenGenerator(payload: any): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (secret) {
    return jwt.sign(payload, secret, {
      expiresIn: "15m",
    });
  }
  throw new BadRequestError("Invalid environment variable");
}

function refreshTokenGenerator(payload: any): string {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (secret) {
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }
  throw new BadRequestError("Invalid environment variable");
}

export { accessTokenGenerator, refreshTokenGenerator };
