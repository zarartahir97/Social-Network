const sequelize = require('sequelize');

const db = new sequelize('social_network', 'postgres', 'babi3151', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = db;