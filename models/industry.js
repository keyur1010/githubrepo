'use strict';
module.exports = (sequelize, DataTypes) => {
  const Industry = sequelize.define('Industry', {
    industry_name: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    willo_department_id: DataTypes.STRING,
    location: DataTypes.STRING,
    website: DataTypes.STRING,
    hf_colour: DataTypes.STRING,
    button_colour: DataTypes.STRING,
    logo: DataTypes.STRING,
    
  }, {});
  Industry.associate = function(models) {
    Industry.belongsToMany(models.Service, { through: 'ServiceIndustry', foreignKey: 'industryId' });
  };
  return Industry;
};
