"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var path = require('path');
var app = express();
var mongoose  = require('mongoose');
const mongooseUtil = require('./utils/mongoose');
const config = require('./config/development');


const appRoutes = require('./routes/appRoutes');

app.set('port', (process.env.PORT || config.port));
app.use('/', express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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

mongoose.connect(config.mongodb.url, {reconnectTries: 15, reconnectInterval: 2000});
var db = mongoose.connection;

db.on("error", console.error.bind(console, 'Mongoose connection failed.\n'));

db.once('open', function () {
    console.log("Connected to MongoDB");
    appRoutes(app);
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.listen(app.get('port'), function () {
        console.log(`App running on ${config.hostname}:${config.port}`);
    });

    process.on("SIGINT", function () {
        db.close(function () {
            console.log("Connection closed.");
            process.exit(0);
        });
    });
    process.on("SIGTERM", mongooseUtil.cleanup);
    process.on("SIGHUP", mongooseUtil.cleanup);
})

module.exports = app;