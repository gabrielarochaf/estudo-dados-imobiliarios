module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
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

      urlImg: DataTypes.STRING,
    },
    {
      sequelize, // We need to pass the connection instance
      createdAt: false,
      updatedAt: false,
      // modelName: "Address",
      tableName: "images",
    }
  );

  Image.associate = (models) => {
    Image.belongsTo(models.RealState, {
      as: "realStates",
      foreignKey: "realStatesId",
    });
  };

  return Image;
};
