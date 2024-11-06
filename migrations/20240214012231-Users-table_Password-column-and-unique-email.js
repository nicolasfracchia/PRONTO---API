'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add column password
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING(150),
      allowNull: false
    });
    // Set email column unique
    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email']
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_email_key');
    await queryInterface.removeColumn('users', 'password');
  }
};