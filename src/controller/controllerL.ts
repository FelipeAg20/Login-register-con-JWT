import { app } from './../../index';
import { Request,Response } from "express";
import { validacionParcial } from "../middleware/validacion";
import { modelos } from "../model/modelR";
import { generarToken } from "../middleware/generarToken";
import  Express  from 'express';
import cookieParser from 'cookie-parser';

// app.use(cookieParser());

export let entrar = async (req:Request, res:Response) => {
    
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
       
        console.log(usuario); 
        const result = await modelos.ingresar(usuario)
        console.log(result);
        
        if(result.logged){
           const resultToken = generarToken({id :usuario.dni},process.env.TOKEN)
           return res.status(200).json({messaje:'Ingreso con exito',token:resultToken })
        //    .cookie('tokenAcc',resultToken,{httpOnly:true,sameSite:'strict'

        //    })
        }else{
        return res.status(401).json({messaje:'Dni o contraseña son invalidos 3'})
        }
    }



};