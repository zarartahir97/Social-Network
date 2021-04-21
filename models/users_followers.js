const Sequelize = require('sequelize');
const db = require('../config/db');

const user_follower = db.define('users_followers', {
    followerId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'users',
            key : 'id'
        }
    },
    followingId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'users',
            key : 'id'
        }
    },
});

module.exports = user_follower;