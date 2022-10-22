'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Marco',
      balance: 800,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mario',
      balance: 1200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fabio',
      balance: 2300,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
