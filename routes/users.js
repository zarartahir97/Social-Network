const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
    user.findAll({
        where: {
            [Op.and]: [
              { email: req.body.email },
              { password: req.body.password }
            ]
          }
    })
    .then(result => {
        if (result.length < 1) {
            return res.status(401).json({
                message: "Authentication Failed"
            })
        }
        else
        {
            const token = jwt.sign(
                {
                    userID : result[0].id,
                    email : result[0].email,
                    password : result[0].password
                },
                'babi3151',
                { expiresIn : '1h'});

            res.status(200).json({
                message : "Login Successful",
                token : token
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/addUser', (req, res) => {
    user.create({
        name : req.body.name,
        email: req.body.email,
        password : req.body.password,
        address : req.body.address,
        phone : req.body.phone,  
    })
    .then(result => {
        console.log(result);
        res.send("User Created!!");
    })
    .catch(err => {
        console.log(err);
        res.send("Error: " + err);
    });
})

module.exports = router;