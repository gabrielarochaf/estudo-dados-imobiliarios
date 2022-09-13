"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("pricing_info", {
      uuid: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      real_states_id: {
        type: Sequelize.STRING(20),
        references: {
          model: {
            modelName: "RealState",
            tableName: "real_states",
            // schema: "schema",
          },
          key: "id",
        },
        allowNull: true,
      },

      yearly_iptu: { type: Sequelize.INTEGER, allowNull: true },
      price: { type: Sequelize.DOUBLE, allowNull: true },
      business_type: { type: Sequelize.STRING, allowNull: true },
      monthly_condo_fee: { type: Sequelize.DOUBLE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("pricing_info");
  },
};
