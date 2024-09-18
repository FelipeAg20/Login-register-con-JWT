import { Request, Response } from "express";
import { modelos } from "../repository/modelR";


export let get = async (req: Request, res: Response) => {
   const result = await modelos.get()
  if (result.success ) {
    res.status(200).json({ data: result.data });
    console.log(result.data);
  } else {
    res.status(400).json({ error: result.message });
}};