import { DataTypes } from "sequelize";

const usuariosAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

const usuariosMethods = {
    timestamps: false
};

const UsuariosModel = {
    usuariosAttributes,
    usuariosMethods
};

export { UsuariosModel } 