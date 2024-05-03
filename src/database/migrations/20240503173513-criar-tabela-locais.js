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
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    localidade: {
      type: Sequelize.STRING,
      allowNull: false
    },
    coord_geo: {
      type: Sequelize.STRING,
      allowNull: false
    }
    });
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('locais');
    
  }
};
