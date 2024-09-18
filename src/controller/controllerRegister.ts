
import { Request,Response } from "express";
import { validacionRegis } from "../middleware/validacion";

import { serviceUser } from "../services/servicesU";

export let register = async (req:Request, res:Response) => {
    console.log(req.body);
    const result = validacionRegis(req.body)
    if (result.error){
        res.status(422).json({ error: result.error});
         console.log(result.error)
    }else{
        let nuevoR = req.body

        const nuevo = await serviceUser.hashRegister(nuevoR)
        
        res.status(200).json({messaje:'Creado con exito',dni:nuevoR.dni})
    }

};