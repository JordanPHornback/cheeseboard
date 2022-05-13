const { Sequelize, sequelize, DataTypes, Model } = require('./db');

class Board extends Model {};

Board.init({
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.NUMBER
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Board};