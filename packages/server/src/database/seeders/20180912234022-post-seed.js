'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arrayPosts = []
    for (let i = 1; i <= 30; i++) {
      arrayPosts.push({
        title: 'Post title ' + (i + 1),
        content: 'Post content ' + (i + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Posts', arrayPosts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
