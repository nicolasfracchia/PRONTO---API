'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ordersstatuses', [
      {id: 1,name: "Waiting for approval"},
      {id: 2,name: "Confirmed"},
      {id: 3,name: "In progress"},
      {id: 4,name: "On the way"},
      {id: 5,name: "Delivered"},
      {id: 6,name: "Cancelled"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ordersstatuses', null, {});
  }
};