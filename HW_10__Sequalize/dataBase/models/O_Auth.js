const DataTypes = require('sequelize');

module.exports = (client) => {
  const O_Auth = client.define(
    'O_Auth',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userID: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
    },
    {
      tableName: 'auth',
      timestamps: false
    }
  );

  return O_Auth;
};
