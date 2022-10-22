'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', [{
      amount: 100,
      sender: 1,
      receiver: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 50,
      sender: 1,
      receiver: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 1000,
      sender: 1,
      receiver: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 78,
      sender: 1,
      receiver: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 40,
      sender: 2,
      receiver: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 20,
      sender: 2,
      receiver: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      amount: 500,
      sender: 3,
      receiver: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
