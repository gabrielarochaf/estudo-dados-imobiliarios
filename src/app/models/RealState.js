const { Sequelize } = require(".");
const Address = require("./Address");

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
      address: {
        type: DataTypes.VIRTUAL,
        get() {
          console.log(this);
          return "ok";
        },
      },
      address_uuid: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        references: {
          // This is a reference to another model
          model: Address,

          // This is the column name of the referenced model
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
      hooks: {
        before: {
          all: [],
          find: [
            Sequelize.BelongsTo(Address, {
              foreignKey: "uuid",
            }),
          ],
        },
      },
    }
  );

  // RealState.belongsTo(Address, { as: "RealState", foreignKey: "uuid" });

  // RealState.associate = function (models) {
  //   RealState.belongsTo(models.address_uuid, {
  //     as: "Address",
  //     foreignKey: "uuid",
  //   });
  // };

  // RealState.associate = function (models) {
  //   RealState.hasOne(models.address_uuid, {
  //     as: "Address",
  //     foreignKey: "uuid",
  //   });
  // };

  return RealState;
};
