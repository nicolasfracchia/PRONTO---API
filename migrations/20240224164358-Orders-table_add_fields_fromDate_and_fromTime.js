'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'forDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
    await queryInterface.addColumn('orders', 'forTime', {
      type: Sequelize.TIME,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    const removeFromDate = queryInterface.removeColumn('orders', 'forDate',{logging:console.log});
    removeFromDate.then(result => { })
    .catch(error => { });

    const removeFromTime = queryInterface.removeColumn('orders', 'forTime',{logging:console.log});
    removeFromTime.then(result => { })
    .catch(error => { });

    return removeFromTime;
  }
};
