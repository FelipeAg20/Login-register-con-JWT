import  bcrypt  from 'bcrypt';
import { conexion } from "../db/connection";


export class modelos{
    static async ingresaRegistro (obj:any){
        const sql =  'INSERT INTO Usuarios ( nombres, apellidos,dni,email, telefono, pass) VALUES (?, ?, ?, ?, ?,?)';
        const values = [obj.nombres, obj.apellidos, obj.dni, obj.email,obj.telefono, obj.pass ];        
        return conexion.execute(sql, values); 

    }

    static async ingresar (obj:any){
        const sql = await 'SELECT pass, nombre FROM Usuarios WHERE telefono = ?'
        const tel = [obj.telefono];
        const result:any = await conexion.execute(sql,tel);  
        console.log(result);
        if (result[0].lenght>0){
            const validarPass = await bcrypt.compare(obj.pass, result[0][0].pass)
            if(validarPass){
                return {logged: true, nombre : result[0][0].nombre}
            }
            return {logged: false,status:"Telefono o Contraseña invalido"}
        }
        return {logged: false,status:"Telefono o Contraseña invalido"}

    }
}
