'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Marco',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mario',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fabio',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
