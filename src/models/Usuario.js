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
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [11, 11]
        }
    }, 
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [9, 9]
        }
    },
    endereço: {
        type: DataTypes.STRING,
        
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