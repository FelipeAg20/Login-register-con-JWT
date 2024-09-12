import { Request,Response } from "express";



export let protegida = async (req:Request, res:Response) => {
    res.send("Esta es una ruta protegida mi papa, solo se puede ver si esta logueado, te amo")


};