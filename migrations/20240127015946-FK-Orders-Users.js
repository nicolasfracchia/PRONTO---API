'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_orders_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('orders', 'fk_orders_users');
  }
};