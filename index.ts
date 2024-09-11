import express from "express";
import dotenv from "dotenv"
import { conexion } from "./src/db/connection";
import { router } from "./src/routes/route";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;
app.use("/holi",router)

app.listen(port, () =>{
        console.log(`Servidor levantado en el puerto ${port}`);
 
});