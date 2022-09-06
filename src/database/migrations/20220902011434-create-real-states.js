"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("real_states", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      usable_areas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      publisher_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unit_types: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      listing_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parking_spaces: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        // defaultValue: Sequelize.fn("now"),
        // defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        // defaultValue: Sequelize.fn("now"),
      },
      owner: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      address_uuid: {
        type: Sequelize.UUID,
        references: {
          model: {
            modelName: "Address",
            tableName: "address",
            schema: "schema",
          },
          // model: "Address",
          key: "uuid",
        },
        allowNull: true,
      },
      suites: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      publication_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_areas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: { type: Sequelize.DOUBLE, allowNull: true },
      business_type: {
        type: Sequelize.STRING,
        // type: DataTypes.ENUM,
        // values: ["SALE",],
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
    await queryInterface.dropTable("real_states");
  },
};
