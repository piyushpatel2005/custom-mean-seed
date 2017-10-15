'use strict';

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

// userSchema.pre('save', function (next) {
//     var user = this;
//     if(!user.isModified(password)) {
//         return next();
//     }

//     bcrypt.genSalt(10, function (err, salt) {
//         if(err) return next(err);
//         bcrypt.hash(user.password, salt, function (error, hash) {
//             if(error) return next(error);
//             user.password = hash;
//             next();
//         });
//     });
// });

// userSchema.methods.comparePassword = function(candidatePassword, next) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if(err) return next(err);
//         next(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', userSchema);
