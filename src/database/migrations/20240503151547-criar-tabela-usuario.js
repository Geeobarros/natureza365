'use strict';

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
     sexo: {
      allowNull: false,
      type: Sequelize.ENUM('Feminino' , 'Masculino', 'Outros')
    },
      data_nascimento: {
      allowNull: false,
      type: Sequelize.DATE
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
