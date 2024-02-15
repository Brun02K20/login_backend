import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler-middleware.js";
import { usuariosRouter } from "./routes/usuarios.routes.js";
import { tareasRouter } from "./routes/tareas.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// declaracion de las url y el router que usara cada una de ellas
app.use(`/api/loginForm/usuarios`, usuariosRouter.router);
app.use(`/api/loginForm/tareas`, tareasRouter.router)


// si ocurre algun error, directamente se ejecuta este middleware
app.use(errorHandler);

export { app }
