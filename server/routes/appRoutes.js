const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res, next) {
    res.render('index');
});

module.exports = router;