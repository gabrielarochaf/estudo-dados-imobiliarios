const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const RealState = sequelize.define(
    "RealState",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      usableAreas: DataTypes.INTEGER,
      description: DataTypes.STRING,
      title: DataTypes.STRING,
      publisherId: DataTypes.STRING,
      unitTypes: DataTypes.STRING,
      listingStatus: DataTypes.STRING,
      parkingSpaces: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      owner: DataTypes.BOOLEAN,
      address_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: "Address",

          key: "uuid",
          // deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      suites: DataTypes.INTEGER,
      publicationType: DataTypes.STRING,
      bathrooms: DataTypes.INTEGER,
      totalAreas: DataTypes.INTEGER,
      bedrooms: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      businessType: DataTypes.STRING,
    },
    {
      tableName: "real_states",
    }
  );

  RealState.associate = (models) => {
    RealState.belongsTo(models.Address, {
      as: "Address",
      foreignKey: "address_uuid",
    });
  };

  return RealState;
};
