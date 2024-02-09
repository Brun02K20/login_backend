import { sequelize } from "../databases/databases.js";

const getAll = async () => {
    const users = await sequelize.models.Usuarios.findAll()
    return users.map(user => user.dataValues)
}

const usuariosServices = {
    getAll
}

export { usuariosServices }