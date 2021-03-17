const DataTypes = require('sequelize');

module.exports = (client) => {
  const User = client.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      yearBorn: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isMarried: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      timestamps: false
    }
  );

  return User;
};
