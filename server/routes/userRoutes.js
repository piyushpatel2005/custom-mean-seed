var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/create', function (req, res) {
    
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save(function(err, result) {
        if(err) {
            res.status(500).json({
                title: "Error",
                message: "Failure to save the record.",
                err: err
            })
        };
        res.status(201).json({
            title: "Success!",
            message: "Your account has been created successfully",
            result: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email }, function (err, user) {
        if(err) next(err);
        if(!user) next(err);
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login Failed',
                error: {
                    message: "Please, enter valid password."
                }
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully Logged in!',
            token: token,
            userId: user._id 
        })
    })
})

module.exports = router;