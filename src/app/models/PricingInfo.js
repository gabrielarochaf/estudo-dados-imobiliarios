module.exports = (sequelize, DataTypes) => {
  const PricingInfo = sequelize.define(
    "PricingInfo",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      realStatesId: {
        type: DataTypes.STRING(20),
        references: {
          model: "RealState",

          key: "uuid",
          // deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      yearlyIptu: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      businessType: DataTypes.STRING,
      monthlyCondoFee: DataTypes.DOUBLE,
    },
    {
      sequelize, // We need to pass the connection instance
      createdAt: false,
      updatedAt: false,
      // modelName: "Address",
      tableName: "pricing_info",
    }
  );

  PricingInfo.associate = (models) => {
    PricingInfo.belongsTo(models.RealState, {
      as: "pricingInfos",
      foreignKey: "realStatesId",
    });
  };

  return PricingInfo;
};
