"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("images", {
      uuid: {
        type: Sequelize.CHAR(36), // FIXME: Poder ser utilizado Sequelize.UUID exeto para SQLITE
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      real_states_id: {
        type: Sequelize.STRING,
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
      url_img: {
        type: Sequelize.STRING,
        // unique: true,
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
    await queryInterface.dropTable("images");
  },
};
