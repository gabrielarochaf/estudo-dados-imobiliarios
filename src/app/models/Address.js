module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      country: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      city: DataTypes.STRING,
      streetNumber: DataTypes.STRING,
      zone: DataTypes.STRING,
      // geoLocation: {
      //   precision: DataTypes.STRING,
      //   location: { lon: DataTypes.DOUBLE, lat: DataTypes.DOUBLE },
      // },
      street: DataTypes.STRING,
      locationId: DataTypes.STRING,
      district: DataTypes.STRING,
      unitNumber: DataTypes.STRING,
      state: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
    },
    {
      sequelize, // We need to pass the connection instance
      createdAt: false,
      updatedAt: false,
      // modelName: "Address",
      tableName: "address",
    }
  );

  Address.associate = (models) => {
    Address.hasMany(models.RealState, {
      as: "realStates",
      foreignKey: "address_uuid",
    });
  };

  return Address;
};

// module.exports = (sequelize, DataTypes) => {
//   class Address extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Address.init(
//     {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Address",
//     }
//   );
//   return Address;
// };
