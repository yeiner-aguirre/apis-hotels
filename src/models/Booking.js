const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const User = require('./User');

const Booking = sequelize.define('booking', {
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // llaves foraneas userId, hotelId
});

module.exports = Booking;