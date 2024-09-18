import {number, z} from 'zod'

const esquema = z.object({
    nombres: z.string(),
    apellidos: z.string(),
    dni: z.string().min(7, "DNI debe tener al menos 7 caracteres").max(15, "DNI debe tener un máximo de 15 caracteres"),
    telefono: z.string().min(7, "Teléfono debe tener al menos 7 caracteres").max(15, "Teléfono debe tener un máximo de 15 caracteres"),
    email: z.string().email("Debe ser un email válido"),
  });

export function  validacionRegis(obj:any){
    return esquema.safeParse(obj)

}
export function validacionParcial(obj:any){
  return esquema.partial().safeParse(obj)
}