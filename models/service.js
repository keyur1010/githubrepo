'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    service_name: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    service_industry: {
      type: DataTypes.JSON,
      validate: {
        isValidJson(value) {
          try {
            JSON.parse(value);
          } catch (e) {
            throw new Error('service_industry must be a valid JSON');
          }
        }
      }
    }
  }, {});
  Service.associate = function(models) {
    Service.belongsToMany(models.Industry, { through: 'ServiceIndustry', foreignKey: 'serviceId' });
  };
  return Service;
};
