import mysql from "mysql2/promise";
import  dotenv  from 'dotenv';
dotenv.config();


export const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NOMBRE,
    port:process.env.DB_PORT ? parseInt(process.env.DB_PORT):undefined
})

