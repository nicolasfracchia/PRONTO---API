'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'total', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    const removeTotal = queryInterface.removeColumn('orders', 'total',{logging:console.log});
    removeTotal.then(result => { })
    .catch(error => { });
    return removeTotal;
  }
};
