// var express = require('express');
// var router = express.Router();
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

// var User = require('../models/user');

// router.post('/', function createUser (req, res, next) {
//     let submittedPass = req.body.confirmPassword;
//     let password = req.body.password;
//     if(password === confirmPassword) {
//         password = password;
//     }
//     var user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: bcrypt.hashSync(password, 10)
//     });
//     user.save(function(err, user) {
//         if(err) next(err);
//         res.status(201).json({
//             message: "Your account has been created successfully",
//             user: user
//         });
//     });
// });

// router.post('/signin', function(req, res, next) {
//     User.findOne({email: req.body.email }, function (err, user) {
//         if(err) next(err);
//         if(!user) next(err);
//         if(!bcrypt.compareSync(req.body.password, user.password) {
//             return res.status(401).json({
//                 title: 'Login Failed',
//                 error: {
//                     message: "Please, enter valid password."
//                 }
//             });
//         }
//         var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
//         res.status(200).json({
//             message: 'Successfully Logged in!',
//             token: token,
//             userId: user._id 
//         })
//     })
// })

