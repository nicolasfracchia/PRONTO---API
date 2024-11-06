'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sections', [
      {id: 1,name: "DAILY FRESH MADE SPECIAL OF THE DAY - $13.95",web: "menu"},
      {id: 2,name: "COMBO DEALS",web: "menu"},
      {id: 3,name: "PIZZA BY THE SLICE",web: "menu"},
      {id: 4,name: "SALADS",web: "menu"},
      {id: 5,name: "PAGNOTTA - HOME MADE RUSTIC ITALIAN BREAD",web: "menu"},
      {id: 6,name: "SPECIALS",web: "catering"},
      {id: 7,name: 'PIZZA - 8" & 12"',web: "catering"},
      {id: 8,name: "SALADS (6 people bowl)",web: "catering"},
      {id: 9,name: "PAGNOTTA",web: "catering"},
      {id: 10,name: 'PIZZA 12"',web: "order"},
      {id: 11,name: 'PIZZA 8"',web: "order"},
      {id: 12,name: "SPECIALS",web: "order"},
      {id: 13,name: "PAGNOTTA",web: "order"},
      {id: 14,name: "SALADS",web: "order"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sections', null, {});
  }
};