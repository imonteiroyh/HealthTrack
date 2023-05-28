const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

router.get('/risk-classification', isAuthenticated, isUserAuthorizated([1]), (req, res, next) => {
    try {
        res.render('risk-classification', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.get('/edit-record', isAuthenticated, isUserAuthorizated([1, 2]), (req, res, next) => {
    try {
        res.render('edit-record', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

module.exports = router;