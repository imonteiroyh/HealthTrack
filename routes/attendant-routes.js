const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

router.route('/register-patient')
    .get(isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            res.render('register-patient', {
                initials: req.session.user.initials
                });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    })

    .post(isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            console.log(req.body)
        } catch(err) {
            console.error(`Error while getting page `, err.message);
            next(err);
        }
    });

router.route('/register-record')
    .get(isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            res.render('register-record', {
                initials: req.session.user.initials
                });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

module.exports = router;