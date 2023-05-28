const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

const databaseQueries = require('../services/database-queries');

router.get('/register-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('register-user', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.post('/register-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        adminObject = {username: req.session.user.username, password: req.body.inputAdminPassword}
        check = databaseQueries.checkPassword(adminObject);

        if (check == 0) {
            // hash inputuserpassord before send to userobject
            userObject = {name: req.body.inputName, lastName: req.body.inputLastName, username: req.body.inputUsername, email: req.body.inputEmail, hash: req.body.inputUserPassword, role: req.body.selectRole};
            databaseQueries.registerUser(userObject);

            res.redirect('/register-user');
        } else if (check == 1) {
            console.log('username inexistente')
        } else {
            console.log('password não bate')
        }

    } catch(err) {
        console.error(`Error while getting page `, err.message);
        next(err);
    }
});

router.get('/remove-user', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('remove-user', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

router.get('/remove-patient', isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
    try {
        res.render('remove-patient', {
            initials: req.session.user.initials
        });
    } catch(error) {
        console.error(`Error while getting page `, error.message);
        next(error);
    }
});

module.exports = router;