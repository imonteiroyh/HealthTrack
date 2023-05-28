const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

router.get('/register-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('register-user', {
            initials: initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.post('/register-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        console.log(req.body)
    } catch(err) {
        console.error(`Error while getting page `, err.message);
        next(err);
    }
});

router.get('/remove-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('remove-user', {
            initials: initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.get('/remove-patient', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('remove-patient', {
            initials: initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

module.exports = router;