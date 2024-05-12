'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('locais', { 
      id: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_local: {
      type: Sequelize.STRING,
      allowNull: false
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
},
    descricao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    localidade: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cep: {
      type: Sequelize.STRING(9),
      allowNull: false
    },
    latitude: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    }
    });
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('locais');
    
  }
};
