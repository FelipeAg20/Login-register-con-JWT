import bcrypt from "bcrypt";
import { conexion } from "../db/connection";

export class modelos {
  static async ingresaRegistro(obj: any) {
    const sql =
      "INSERT INTO Usuarios ( nombres, apellidos,dni,email, telefono, pass) VALUES (?, ?, ?, ?, ?,?)";
    const values = [
      obj.nombres,
      obj.apellidos,
      obj.dni,
      obj.email,
      obj.telefono,
      obj.pass,
    ];
    return conexion.execute(sql, values);
  }

  static async ingresar(obj: any) {
    const sql = "SELECT pass, nombres FROM Usuarios WHERE dni = ?";
    const dni = [obj.dni];
    const result: any = await conexion.execute(sql, dni);

    if (result[0].length > 0) {
      const pssHash = result[0][0].pass;
      const validarPass = await bcrypt.compare(obj.pass, pssHash);

      if (validarPass) {
        return { logged: true, nombre: result[0][0].nombres };
      }
      return { logged: false, status: "Dni o Contraseña invalido 1" };
    }
    return { logged: false, status: "Dni o Contraseña invalido 2" };
  }
}
