'use strict';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Industries', [
      { industry_name: 'Technology', status: true, createdAt: new Date(), updatedAt: new Date() },
      { industry_name: 'Healthcare', status: true, createdAt: new Date(), updatedAt: new Date() },
      { industry_name: 'Finance', status: true, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Industries', null, {});
  }
};
