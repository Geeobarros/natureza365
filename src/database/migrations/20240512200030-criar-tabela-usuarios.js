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
      type: Sequelize.ENUM('Feminino', 'Masculino', 'Outros')
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATE
      },
     cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [14, 14]
      }
     },
     cep: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [9, 9]
      }     
     },
     endereco: {
      type: Sequelize.STRING,
      allowNull: false
     },
     email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
        unique: true
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
