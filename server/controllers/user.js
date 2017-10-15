var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/signup', function (req, res, next) {
    let submittedPass = req.body.confirmPassword;
    let password = req.body.password;
    if(password === confirmPassword) {
        password = password;
    }
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(password, 10)
    });
    user.save(function(err, user) {
        if(err) next(err);
        res.status(201).json({
            message: "Your account has been created successfully",
            user: user
        });
    });
});

