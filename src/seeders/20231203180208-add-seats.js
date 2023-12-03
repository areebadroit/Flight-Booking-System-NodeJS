"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 6,
        row: 1,
        column: "A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        column: "B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        column: "C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        column: "D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        column: "E",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        column: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "E",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        column: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
