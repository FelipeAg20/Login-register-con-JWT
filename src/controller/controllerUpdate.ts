
import { Request,Response } from "express";
import { validacionParcial, validacionRegis } from "../middleware/validacion";
import { modelos } from "../repository/modelR";
import { serviceUser } from "../services/servicesU";

export let update = async (req:Request, res:Response) => {
    const dni = req.params.dni;
    const updateData = req.body; 

    const result = await modelos.update(dni, updateData);

    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(400).json({ error: result.message });
    }

};