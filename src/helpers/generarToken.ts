import jwt from 'jsonwebtoken'

export function generarToken(data: any, key:any){
   
    const token = jwt.sign({data:data},key,{expiresIn:'1h'})
    return token 
}