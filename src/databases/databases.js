import { Sequelize } from "sequelize";
import { UsuariosModel } from "../models/Usuarios.js";

// creando DB usando dialecto MySQL
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "bcxdwq26hm6h7udxn8hn-mysql.services.clever-cloud.com",
    username: "u0wefuvgiq3bjv7k",
    password: "wDIiYrCap8i3aYxA8vCD",
    database: "bcxdwq26hm6h7udxn8hn"
});

sequelize.define("Usuarios", UsuariosModel.usuariosAttributes, UsuariosModel.usuariosMethods);

try {
    // await sequelize.sync();
} catch (error) {
    console.log("Error en la conexion a la BD:", error.message);
}

export { sequelize }