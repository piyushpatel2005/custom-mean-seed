"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
var path = require('path');
var app = express();

const appRoutes = require('./routes/appRoutes');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(express.static(__dirname + '../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     return res.render('index');
// });

app.listen(app.get('port'), function () {
    console.log("Server listening on " + app.get('port'));
})

module.exports = app;