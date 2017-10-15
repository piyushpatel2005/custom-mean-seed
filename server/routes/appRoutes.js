const express = require('express');
const router = express.Router();

router.route('/*').get(function(req, res, next) {
    res.send("Error");
});

module.exports = function () {
    let router = express.Router();

    // TODO: add routes here from controllers
};