const express = require('express');
const router = express.Router();
const db = require('../config/db');
const posts = require('../models/posts');
const checkAuth = require('../middleware/check-auth');
const { QueryTypes } = require('sequelize');

router.get('/:noOfPosts?', checkAuth, (req, res) => {
    if (!req.params.noOfPosts)
    {
        req.params.noOfPosts = 10;
    }
    db.query('SELECT * from posts join users_followers on "userId" = "followingId" where "followerId"=' + req.userData.userID +' limit ' + req.params.noOfPosts, {
        type: QueryTypes.SELECT
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            result: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.post('/', checkAuth, (req, res) => {
    const socket = req.app.get('socketio');
    posts.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.userData.userID
    })
    .then(result => {
        console.log(result);
        socket.emit('postsUpdated',result);
        
        res.status(200).json({
            message: "Post Added Successfully"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;