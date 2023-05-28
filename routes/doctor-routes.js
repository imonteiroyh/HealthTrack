const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

router.get('/record-queue', isAuthenticated, isUserAuthorizated([2]), (req, res, next) => {
    try {
        res.render('record-queue', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.get('/edit-record-doctor', isAuthenticated, isUserAuthorizated([2]), (req, res, next) => {
    try {
        res.render('edit-record-doctor', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

module.exports = router;