const { Sequelize } = require(".");
const { slugify } = require("../helpers");

module.exports = (sequelize, DataTypes) => {
  const RealState = sequelize.define(
    "RealState",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      usableAreas: DataTypes.INTEGER,
      description: DataTypes.STRING,
      title: DataTypes.STRING,
      slug: {
        type: DataTypes.VIRTUAL,
        get() {
          return `http://localhost:3000/imoveis/${this.id}-${slugify(
            this.title
          )}`;
        },
      },
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
      addressUuid: {
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
      // price: DataTypes.DOUBLE,
      // businessType: DataTypes.STRING,
    },
    {
      tableName: "real_states",
    }
  );

  RealState.associate = (models) => {
    RealState.belongsTo(models.Address, {
      as: "address",
      foreignKey: "addressUuid",
    });

    RealState.hasMany(models.Image, {
      as: "images",
      foreignKey: "realStatesId",
    });

    RealState.hasOne(models.PricingInfo, {
      as: "pricingInfos",
      foreignKey: "realStatesId",
    });
  };

  return RealState;
};
