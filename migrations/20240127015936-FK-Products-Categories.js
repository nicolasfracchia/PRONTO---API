'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_products_categories',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('products', 'fk_products_categories');
  }
};