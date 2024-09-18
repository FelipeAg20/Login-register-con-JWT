import { hash } from '../helpers/hash';
import { modelos } from '../repository/modelR';

export class serviceUser{
    static async hashRegister(user:any){
        user.pass = await hash(user.pass);
        return modelos.ingresaRegistro(user)

    }
    static async login(user:any){
        return modelos.ingresar(user)

    } 
}