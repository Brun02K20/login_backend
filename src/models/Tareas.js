import { DataTypes } from "sequelize";

const tareasAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const tareasMethods = {
    timestamps: false
};

const TareasModel = {
    tareasAttributes,
    tareasMethods
}

export { TareasModel }