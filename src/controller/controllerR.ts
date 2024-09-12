import  Express  from "express";
import { Request,Response } from "express";
import { validacionRegis } from "../middleware/validacion";
import { modelos } from "../model/modelR";
import {hash} from "../middleware/hash";

export let register = async (req:Request, res:Response) => {
    console.log(req.body);
    const result = validacionRegis(req.body)
    if (result.error){
        res.status(422).json({ error: result.error});
         console.log(result.error)
    }else{
        let nuevoR = req.body
        nuevoR.pass = await hash(nuevoR.pass)
        const insert = await modelos.ingresaRegistro(nuevoR)
        res.status(200).json({messaje:'Creado con exito',dni:nuevoR.dni})
    }



};