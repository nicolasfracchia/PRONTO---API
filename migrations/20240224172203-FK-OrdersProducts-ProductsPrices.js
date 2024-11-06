'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('ordersproducts', {
      fields: ['productPricesId'],
      type: 'foreign key',
      name: 'fk_ordersproducts_productprices',
      references: {
        table: 'productprices',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ordersproducts', 'fk_ordersproducts_productprices');
  }
};