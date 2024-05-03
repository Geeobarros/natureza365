const { database } = require("../config/database.config");
const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize")


const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    data_nascimento: {
        type: DataTypes.DATE
    },
    sexo: {
        type: DataTypes.ENUM('Feminino',
        'Masculino', 'Outros'), 
        allowNull: false
    }, 
    CPF: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [11, 11]
        }
    }, 
    endereço: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Usuario