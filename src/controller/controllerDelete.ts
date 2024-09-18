import { Request, Response } from "express";
import { validacionParcial } from "../middleware/validacion";
import { modelos } from "../repository/modelR";

export let deletee = async (req: Request, res: Response) => {
  const dni = validacionParcial(req.params);
  console.log(req.params)
  if (dni.error) {
    res.status(401).json({ error: dni.error });
  } else {
    const result = await modelos.delete({dni});

    if (result.success) {
      res.status(200).json(result.message);
    } else {
      res.status(401).json({ error: result.status });
    }
  }
};
