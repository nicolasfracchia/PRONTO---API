'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const removeproductId = queryInterface.removeColumn('ordersproducts', 'productId',{logging:console.log});
    removeproductId.then(result => { })
    .catch(error => { });
    return removeproductId;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('ordersproducts', 'productId', {
      type: Sequelize.INTEGER(11),
      allowNull: false
    });
  }
};
