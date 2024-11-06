'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersStatus extends Model {
    static associate(models) {
      OrdersStatus.hasMany(models.Orders, {foreignKey:'ordersstatusesId'});
    }
  }
  OrdersStatus.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrdersStatus',
    timestamps: false
  });
  return OrdersStatus;
};