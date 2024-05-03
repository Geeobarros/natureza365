'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios', {
      id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
      },
      nome: {
       allowNull: false,
       type: Sequelize.STRING
      },
      data_nascimento: {
      allowNull: false,
      type: Sequelize.DATE
      },
     sexo: {
      allowNull: false,
      type: Sequelize.ENUM('Feminino' , 'Masculino', 'Outros')
      },
     cpf: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11]
      }
     },
     endereco: {
      type: Sequelize.STRING,
      allowNull: false
     },
     email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull:false
     },
     senha: {
      type: Sequelize.STRING,
      allowNull: false
     },
      createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
      updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     }
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('usuarios');
     
  }
};
