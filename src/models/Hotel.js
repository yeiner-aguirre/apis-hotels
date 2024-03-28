const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Hotel = sequelize.define('hotel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    lon: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    //cityId es una llave foranea
});

module.exports = Hotel;