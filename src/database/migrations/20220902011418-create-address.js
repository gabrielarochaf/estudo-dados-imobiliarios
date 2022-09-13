"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("address", {
      uuid: {
        type: Sequelize.CHAR(36), // FIXME: Poder ser utilizado Sequelize.UUID exeto para SQLITE
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // geoLocation: {

      precision: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location_lon: { type: Sequelize.DOUBLE, allowNull: true },
      location_lat: { type: Sequelize.DOUBLE, allowNull: true },

      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unit_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("address");
  },
};
