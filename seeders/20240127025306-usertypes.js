'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usertypes', [
      {id: 1,type: "Admin"},
      {id: 2,type: "Employee"},
      {id: 3,type: "Customer"},
      {id: 4,type: "Guest"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};