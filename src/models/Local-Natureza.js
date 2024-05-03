const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Local = connection.define('locais', {
    nome_local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coord_geo: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Local