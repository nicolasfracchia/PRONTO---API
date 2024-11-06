'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // add column concept in ordersproducts
    await queryInterface.addColumn('ordersproducts', 'concept', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ordersproducts', 'concept');
  }
};
