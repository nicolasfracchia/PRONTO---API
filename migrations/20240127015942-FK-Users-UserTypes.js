'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('users', {
      fields: ['usertypesId'],
      type: 'foreign key',
      name: 'fk_users_usertypes',
      references: {
        table: 'usertypes',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('users', 'fk_users_usertypes');
  }
};