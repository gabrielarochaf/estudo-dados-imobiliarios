module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    realStatesId: DataTypes.STRING,
    url_img: DataTypes.STRING,
  });

  return Images;
};
