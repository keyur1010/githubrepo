'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceIndustry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceIndustry.init({
    serviceId: DataTypes.INTEGER,
    industryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceIndustry',
  });
  return ServiceIndustry;
};