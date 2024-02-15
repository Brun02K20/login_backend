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

router.post("/signUp", async (req, res, next) => {
    try {
        const user = await usuariosServices.createUser(req.body)
        return res.json(user)
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const user = await usuariosServices.login(req.body)
        return res.json(user)
    } catch (error) {
        next(error)
    }
})

const usuariosRouter = { router }
export { usuariosRouter }