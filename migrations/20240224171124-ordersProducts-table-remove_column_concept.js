'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const removeproductId = queryInterface.removeColumn('ordersproducts', 'concept',{logging:console.log});
    removeproductId.then(result => { })
    .catch(error => { });
    return removeproductId;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('ordersproducts', 'concept', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  }
};
