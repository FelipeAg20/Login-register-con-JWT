import { Router } from "express";
import { register } from "../controller/controllerR";
import { entrar } from "../controller/controllerL";
import { conexion } from "../db/connection";


export const router = Router();

router
    .get( "/", async (req, res) => {
        try{
            const result = await conexion.query('SELECT * FROM `usuarios`')
            res.status(200).json(result)

        }catch{
            res.status(500).json({ error: "Error al obtener usuarios" });

        }

      
    })
    .post( "/", register)
    .get( "/", entrar)