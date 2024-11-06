'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, {foreignKey:'userId'});
      Orders.belongsTo(models.OrdersStatus, {foreignKey:'ordersstatusesId'});
      Orders.hasMany(models.OrdersProducts, {foreignKey:'orderId'});
    }
  }
  Orders.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ordersstatusesId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    forDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    forTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Orders'
  });
  return Orders;
};