'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    // remove column discount from ordersproducts
    //await Sequelize.query('ALTER TABLE Ordersproducts DROP COLUMN discount');
    //await queryInterface.removeColumn('ordersproducts', 'discount');
    const removeColumn = queryInterface.removeColumn('ordersproducts', 'discount',{logging:console.log});
    console.log('REMOVE COLUMN PROMISE ', removeColumn);
    removeColumn.then(result => {
      console.log('THEN DEL removeColumn: ', result)
      return result;
    })
    .catch(error => {
      console.error('ERROR EN removeColumn: ', error)
      return error;
    });

    return removeColumn;

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('ordersproducts', 'discount');
  }
};
