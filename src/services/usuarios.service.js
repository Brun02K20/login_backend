import jwt from 'jsonwebtoken';
import { sequelize } from "../databases/databases.js";
import bcrypt, { hash } from 'bcrypt'; // importo bcrypt para el hasheo de contraseñas
import dotenv from "dotenv"
dotenv.config()


const getAll = async () => {
    const users = await sequelize.models.Usuarios.findAll({
        attributes: { exclude: ["password"] }
    })
    return users.map(user => user.dataValues)
}

const createUser = async (body) => {
    try {
        const haseado = await bcrypt.hash(body.password, 10); // hashear el password

        const user = await sequelize.models.Usuarios.create({
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            sexo: body.sexo,
            email: body.email,
            password: haseado
        })

        delete user.dataValues.password



    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            if (error.errors[0].path === 'unique_email') {
                return { error: 'ERROR: Este correo ya está asociado a otra cuenta.' };
            }
        }
        throw error;
    }
}

const login = async (body) => {
    try {
        const rdo = await sequelize.models.Usuarios.findOne({ // busca un usuario con el email ingresado
            where: {
                email: body.email
            }
        });

        if (rdo) { // si lo encuentra, compara el password ingresado con el de la BD
            const same = await bcrypt.compare(body.password, rdo.dataValues.password)
            if (same) { // si son iguales, devuelve el usuario
                delete rdo.dataValues.password;
                // Generar token de autenticación
                // Puedes cambiar 'sexo' por tu propia clave secreta
                const token = jwt.sign({ userId: rdo.id }, process.env.SECRET, { expiresIn: '1h' });
                return { ...rdo.dataValues, token }
                // si no, se ejecuta el error correspondiente
            } else {
                return { error: 'No existe usuario con los datos ingresados' }
            }
        } else {
            return { error: 'No existe usuario con los datos ingresados' }
        }
    } catch (error) {
        console.log("ERROR: ", error)
        return { error: "Error en la autenticación" }
    }
}

const usuariosServices = {
    getAll,
    createUser,
    login
}

export { usuariosServices }