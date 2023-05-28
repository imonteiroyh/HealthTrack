const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../services/authentication');

const databaseQueries = require('../services/database-queries');

router.route('/')
    .get((req, res, next) => {
        try {
            const profile = req.session.user ? req.session.user.role : null;

            switch (profile) {
                // Admin
                case '3':
                    res.render('register-user', {
                        initials: req.session.user.initials
                    });
                    break;

                // Doctor
                case '2':
                    res.render('record-queue', {
                        initials: req.session.user.initials
                    });
                    break;

                // Risk Classification
                case '1':
                    res.render('risk-classification', {
                        initials: req.session.user.initials
                    });
                    break;

                // Attendant
                case '0':
                    res.render('register-patient', {
                        initials: req.session.user.initials
                        });
                        break;

                // Not authenticated
                default:
                    res.redirect('login');
                    break;
            }
        } catch(error) {
            console.error('Error while getting page ', error.message);
            next(error);
        }
    });

router.route('/login')
    .get((req, res, next) => {
        try {
            res.render('login');
        } catch(error) {
            console.error('Error while getting page ', error.message);
            next(error);
        }
    })

    .post((req, res, next) => {
        try {
            userObject = {username: req.body.inputUsername, password: req.body.inputPassword};
            check = databaseQueries.checkUser(userObject);

            if (check == 0) {
                userInfo = databaseQueries.getUserInfo(userObject.username);
                req.session.user = {
                    username: userInfo.username,
                    role: userInfo.role,
                    initials: userInfo.initials
                };

                res.json({redirect: '/'});
            } else if (check == 1) {
                console.log('username inexistente')
            } else {
                console.log('password não bate')
            }

        } catch(err) {
            console.error('Error while getting page ', err.message);
            next(err);
        }
    });

router.route('/logout')
    .get((req, res, next) => {
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (err) {
            console.error('Error while getting page ', err.message);
            next(err);
        }
    })

    .post((req, res, next) => {
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (err) {
            console.error('Error while getting page ', err.message);
            next(err);
        }
    });

router.route('/configurations')
    .get(isAuthenticated, (req, res, next) => {
        try {
            res.render('configurations', {
                initials: req.session.user.initials
            });
        } catch(error) {
            console.error('Error while getting page ', error.message);
            next(error);
        }
    });

module.exports = router;