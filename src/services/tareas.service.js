import { sequelize } from "../databases/databases.js";

const getAll = async () => {
    const rdo = await sequelize.models.Tareas.findAll({
        include: [
            {
                model: sequelize.models.Usuarios,
                attributes: {
                    exclude: ["password"]
                }
            }
        ]
    })
    return rdo.map(t => t.dataValues)
}

const createTarea = async (body) => {
    const rdo = await sequelize.models.Tareas.create({
        titulo: body.titulo,
        contenido: body.contenido,
        userId: body.userId
    })
    return rdo.dataValues
}

const tareasServices = {
    getAll,
    createTarea
}

export { tareasServices }