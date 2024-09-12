import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export async function validarToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Acceso denegado, falta el token" });
  }

  const key = process.env.TOKEN;
  try {
    const verificar = Jwt.verify(token, key as string);
    next();
  } catch {
    return res
      .status(403)
      .json({ error: "Acceso denegado, token invalido o expirado" });
  }
}
