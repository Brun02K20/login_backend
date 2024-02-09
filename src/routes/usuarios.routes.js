import express from "express";
import { usuariosServices } from "../services/usuarios.service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await usuariosServices.getAll()
        return res.json(users)
    } catch (error) {
        next(error)
    }
})

const usuariosRouter = { router }
export { usuariosRouter }