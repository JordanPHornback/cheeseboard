const { Sequelize, sequelize, DataTypes, Model } = require('./db');

class Cheese extends Model {};

Cheese.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});

module.exports = {
    Cheese
};