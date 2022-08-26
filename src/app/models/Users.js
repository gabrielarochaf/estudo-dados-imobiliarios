module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    phones: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    levelConfig: DataTypes.STRING,
    levelExport: DataTypes.BOOLEAN,
    levelBulk: DataTypes.BOOLEAN,
    levelDelete: DataTypes.BOOLEAN,
    levelView: DataTypes.STRING,
    levelEdit: DataTypes.STRING,
    team: [{ id: DataTypes.STRING }],
    defaultPipeline: [{ id: DataTypes.STRING }],
    defaultDashboard: [{ id: DataTypes.STRING }],
    timezone: [{ id: DataTypes.STRING }],
  });

  return User;
};
