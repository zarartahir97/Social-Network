const Sequelize = require('sequelize');
const db = require('../config/db');

const post = db.define('posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

module.exports = post;