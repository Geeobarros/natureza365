'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('locais', 'coord_geo');
    
  },

  async down (queryInterface, Sequelize) {
   
  await queryInterface.addColumn('locais', 'coord_geo')  
  }
};
