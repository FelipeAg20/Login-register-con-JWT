import { Router } from "express";
import { register } from "../controller/controllerRegister";
import { entrar } from "../controller/controllerLogin";
import { validarToken } from "../middleware/validarToken";
import { deletee } from "../controller/controllerDelete";
import { update } from "../controller/controllerUpdate";
import { get } from "../controller/controllerGet";
export const router = Router();

router
    .get( "/get", validarToken,get)
    .post( "/register", register)
    .post( "/login", entrar)
    .delete("/delete/:dni",validarToken,deletee)
    .put("/update",validarToken,update)
    