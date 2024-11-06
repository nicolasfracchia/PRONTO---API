'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersProducts extends Model {
    static associate(models) {
      OrdersProducts.belongsTo(models.ProductPrices, {foreignKey:'productPricesId'});
      OrdersProducts.belongsTo(models.OrdersStatus, {foreignKey:'orderId'});
      
    }
  }
  OrdersProducts.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productPricesId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrdersProducts',
    timestamps: false
  });
  return OrdersProducts;
};