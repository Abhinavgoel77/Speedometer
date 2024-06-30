const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SpeedData = sequelize.define('SpeedData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = SpeedData;
