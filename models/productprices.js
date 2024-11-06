'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductPrices extends Model {
    static associate(models) {
      ProductPrices.belongsTo(models.Products, {foreignKey:'productId'});
      ProductPrices.belongsTo(models.Sections, {foreignKey: 'sectionId'});
      ProductPrices.hasMany(models.OrdersProducts, {foreignKey:'productPricesId'});
    }
  }
  ProductPrices.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ProductPrices',
    timestamps: false
  });
  return ProductPrices;
};