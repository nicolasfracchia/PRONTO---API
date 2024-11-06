'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ordersproducts', 'productPricesId', {
      type: Sequelize.INTEGER(11),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    const removeproductPricesId = queryInterface.removeColumn('ordersproducts', 'productPricesId',{logging:console.log});
    removeproductPricesId.then(result => { })
    .catch(error => { });
    return removeproductPricesId;
  }
};
