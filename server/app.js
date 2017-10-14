"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var path = require('path');
var app = express();
const config = require('./config/development');


const appRoutes = require('./routes/appRoutes');

app.set('port', (process.env.PORT || config.port));
app.use('/', express.static(path.join(__dirname, '../public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(express.static(__dirname + '../public'));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

const mongoose = require('./utils/mongoose').initializeMongoose(app, () => {
    app.listen(3000, function() {
        console.log(`App listening on ${config.hostname}:${config.port}`);
        app.use('/', appRoutes);
    });
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     return res.render('index');
// });


module.exports = app;