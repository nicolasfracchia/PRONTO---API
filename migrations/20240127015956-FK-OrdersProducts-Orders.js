'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('ordersproducts', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'fk_ordersproducts_orders',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ordersproducts', 'fk_ordersproducts_orders');
  }
};