const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Local = connection.define('locais', {
    nome_local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        validate: {
            len: [9, 9]
        }
    },
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    }
})

module.exports = Local;