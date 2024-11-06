'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('orders', {
      fields: ['ordersstatusesId'],
      type: 'foreign key',
      name: 'fk_orders_status',
      references: {
        table: 'ordersstatuses',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('orders', 'fk_orders_status');
  }
};