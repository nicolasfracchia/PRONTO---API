'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sections extends Model {
    static associate(models) {
      Sections.hasMany(models.ProductPrices, {foreignKey: 'sectionId'});
    }
  }
  Sections.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    web: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sections',
    timestamps: false
  });
  return Sections;
};