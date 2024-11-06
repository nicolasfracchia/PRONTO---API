'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTypes extends Model {
    static associate(models) {
      UserTypes.hasMany(models.Users, {foreignKey:'usertypesId'});
    }
  }
  UserTypes.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserTypes',
    timestamps: false
  });
  return UserTypes;
};