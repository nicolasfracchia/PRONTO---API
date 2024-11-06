'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('productprices', {
      fields: ['sectionId'],
      type: 'foreign key',
      name: 'fk_productprices_sections',
      references: {
        table: 'sections',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('productprices', 'fk_productprices_sections');
  }
};