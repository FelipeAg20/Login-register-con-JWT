import { Request, Response } from "express";
import { validacionParcial } from "../middleware/validacion";
import { generarToken } from "../helpers/generarToken";
import { serviceUser } from "../services/servicesU";
import { app } from '../../index';
// import cookieParser from 'cookie-parser';
// app.use(cookieParser());

export let entrar = async (req: Request, res: Response) => {
  const result = validacionParcial(req.body);
  if (result.error) {
    res.status(401).json({ error: result.error });
    console.log(result.error);
  } else {
    let { dni, pass } = req.body;
    let usuario = {
      dni: dni,
      pass: pass,
    };

    console.log(usuario);
    const result = await serviceUser.login(usuario);
    console.log(result);

    if (result.logged) {
      const resultToken = generarToken({ id: usuario.dni }, process.env.TOKEN);
      
      return res
        .status(200)
        .json({
          messaje: "Ingreso con exito",
          token: resultToken,
          
        })
         .cookie('tokenAcc',resultToken,{httpOnly:true,sameSite:'strict',maxAge:18000})

         
    } else {
      return res
        .status(401)
        .json({ messaje: "Dni o contraseña son invalidos 3" });
    }
  }
};
