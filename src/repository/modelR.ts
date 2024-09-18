import bcrypt from "bcrypt";
import { conexion } from "../db/connection";

export class modelos {
  static async get() {
    try {
      const rows = await conexion.execute("SELECT * FROM `usuarios`");

      if (rows.length > 0) {
        return { success: true, data: rows };
      } else {
        return { success: false, message: "No se encontraron usuarios" };
      }
    } catch (error) {
      console.error("Error al traer los usuarios:", error);
      return { success: false, message: "Error al traer los usuarios" };
    }
  }
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
  static async update(dni: string, updateData: any) {
    const sql = "UPDATE `usuarios` SET ? WHERE dni = ?";
    try {
      const rows = await conexion.execute(sql, [updateData, dni]); // Pasa updateData como un objeto

      if (rows.length > 0) {
        return { success: true, message: "Usuario actualizado con éxito" };
      } else {
        return { success: false, message: "Usuario no encontrado" };
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return { success: false, message: "Error al actualizar el usuario" };
    }
  }
  static async delete(obj: any) {
    const dni = obj.dni;
    console.log(dni);

    try {
      const sql = "DELETE FROM `usuarios` WHERE dni = ?";
      const result = await conexion.execute(sql, dni);
      console.log(result);

      if (result.length > 0) {
        return { success: true, message: "Usuario eliminado con éxito" };
      } else {
        return { success: false, status: "Usuario no encontrado" };
      }
    } catch (error) {
      console.log("Error al eliminar el usuario:", error);
      return { success: false, status: "Error al eliminar el usuario 1" };
    }
  }
}
