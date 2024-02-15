import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const tokenExtractorMiddleware = (req, res, next) => {
    const authorization = req.get("authorization");
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
    }

    console.log("hasta la linea de decodedToken llega");
    let decodedToken = {};
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
        console.log("TOKEN DECODIFICADO: ", decodedToken);
        req.decodedToken = decodedToken; // Guardamos el token decodificado en el objeto de solicitud para que esté disponible en los controladores posteriores.
        next(); // Pasamos al siguiente middleware o controlador. Que va a ser el endpoint si esta todo OK
    } catch (error) {
        console.log("ENTRO AL CATCH DE ERRORES GLOBAL");
        next(error); // Pasamos el error al siguiente middleware de manejo de errores. EN mi caso, el errorHandlerMiddleware
    }
};

export { tokenExtractorMiddleware }