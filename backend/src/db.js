// Se importan las bibliotecas para manejar la conexión a la base de datos
import mongoose from "mongoose";

//Se importa la biblioteca para manejar el archivo .env y no poner directamente las credenciales de la base de datos
import dotenv from "dotenv";
dotenv.config();

export const connect_db_mongoose = async () => {
    try {
        await mongoose.connect(process.env.string_conexion);
        console.log("> Se ha conectado exitosamente a la base de datos");
    } catch (error) {
        console.log("> Error al establecer una conexión a la base de datos\n", error);
    }
}
