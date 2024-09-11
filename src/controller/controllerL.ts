import  Express  from "express";
import { Request,Response } from "express";
import { validacionParcial } from "../middleware/validacion";
import { modelos } from "../model/modelR";
import {hash} from "../middleware/hash";
import { generarToken } from "../middleware/generarToken";

export let entrar = async (req:Request, res:Response) => {
    console.log(req.body);
    const result = validacionParcial(req.body)
    if (result.error){
        res.status(401).json({ error: result.error});
         console.log(result.error)
    }else{
        let {dni,pass}= req.body
        let usuario ={
            dni:dni,
            pass:pass
        }
        usuario.pass = await hash(usuario.pass)
        const result = await modelos.ingresar(usuario)
        if(result.logged){
           return res.status(200).json({messaje:'Ingreso con exito',
            resultToken :generarToken({id :usuario.dni},process.env.TOKEN)
        })
        

        }

    }



};