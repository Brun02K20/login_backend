import { ResourceNotFound } from "../errors/resource-not-found-error.js";
import { ValidationError } from "sequelize";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

// middleware para manejo de errores basicos como un 500 si existe un error del lado del servidor o un error de restricciones en base de datos (400)
const errorHandler = (error, req, res, next) => {
    // console.log("ENTRO AL MIDDLEWARE DE ERRORES GLOBAL");
    if (error instanceof ResourceNotFound) {
        return res.status(error.status).json({ error: error.message });
    }

    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
    }

    if (error instanceof jwt.JsonWebTokenError && error.message === 'invalid signature') {
        // console.log("ENTRO AL ERROR DE FIRMA INVALIDA");
        return res.status(401).json({ error: "TOKEN CON FIRMA INCORRECTA." });
    } else if (error instanceof jwt.JsonWebTokenError && error.message === 'jwt must be provided') {
        return res.status(401).json({ error: "TOKEN NO HA SIDO PROVISTO" })
    } else if (error.name === "TokenExpiredError") {
        // console.log("ENTRO AL ERROR DE TOKEN VENCIDO");
        return res.status(401).json({ error: "TOKEN VENCIDO." });
    }

    console.log("QUE PASAAAAAAAAAA: ", error);
    return res.status(500).json({ error: 'Error imprevisto.' });
};

export { errorHandler };


// if (error instanceof jwt.JsonWebTokenError && error.message === 'invalid signature') {
//     return res.status(401).json({ error: "No estás logueado para poder hacer esta tarea." })
// } else if (error.name === "TokenExpiredError") {
//     return res.status(401).json({ error: "TOKEN VENCIDO." })
// } else {
//     return res.status(401).json({ error: "Error de autenticación." })
// }