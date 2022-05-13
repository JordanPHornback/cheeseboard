const {sequelize} = require('sequelize');
const {User} = require('./user');
const {Board} = require('./board');
const {Cheese} = require('./cheese');

const {Sequelize, DataTypes, Model} = require('./db');

Board.belongsTo(User);
User.hasMany(Board);
Cheese.belongsToMany(Board, { through: 'Cheeseboard'})
Board.belongsToMany(Cheese, { through: 'Cheeseboard'});

module.exports = {
    User,
    Board,
    Cheese
};