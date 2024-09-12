import { Router } from "express";
import { register } from "../controller/controllerR";
import { entrar } from "../controller/controllerL";
import { conexion } from "../db/connection";
import { protegida } from "../controller/controllerP";
import { validarToken } from "../middleware/validarToken";

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
    .post( "/login", entrar)
    .get("/protegida",validarToken,protegida)