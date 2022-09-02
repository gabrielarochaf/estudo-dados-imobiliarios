module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
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
  });

  return Address;
};
