const path = require('path');
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './cheeseboard.sqlite',
    logging: false
});

module.exports = {
    sequelize,
    Sequelize,
    Model,
    DataTypes
};