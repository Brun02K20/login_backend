import express, { response } from "express";
import { tareasServices } from "../services/tareas.service.js";
const router = express.Router();
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { tokenExtractorMiddleware } from "../middlewares/token-extractor-middleware.js";
dotenv.config()

router.get("", async (req, res, next) => {
    try {
        const rdo = await tareasServices.getAll()
        return res.json(rdo)
    } catch (error) {
        next(error)
    }
})

router.post("", tokenExtractorMiddleware, async (req, res, next) => {
    if (!req.decodedToken || !req.decodedToken.userId) {
        return res.status(401).json({ error: "Token no válido" });
    }

    try {
        const rdo = await tareasServices.createTarea(req.body)
        return res.json(rdo)
    } catch (error) {
        next(error)
    }
})

const tareasRouter = { router }
export { tareasRouter }