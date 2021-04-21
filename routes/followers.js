const express = require('express');
const router = express.Router();
const user = require('../models/users');
const user_follower = require('../models/users_followers');
const checkAuth = require('../middleware/check-auth');

router.get('/:noOfFollowers?', checkAuth, (req, res) => {
    if (!req.params.noOfFollowers)
    {
        req.params.noOfFollowers = 10;
    }
    user.findAll({
        include : ["followers"],
        where: { id: req.userData.userID},
        limit: req.params.noOfFollowers  
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

router.post('/:followingId', checkAuth, (req, res) => {
    user_follower.create({
        followerId: req.userData.userID,
        followingId: req.params.followingId
    })
    .then(() => {
        res.status(200).json({
            message: "Followed User Successfully"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.delete('/:followingId', checkAuth, (req, res) => {
    user_follower.destroy({
        where: {
            followerId: req.userData.userID,
            followingId: req.params.followerId
        }
    })
    .then(() => {
        res.status(200).json({
            message: "Unfollowed User Successfully"
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