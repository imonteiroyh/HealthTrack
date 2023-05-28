const express = require('express');
const databaseQueries = require('../services/database-queries')

function isAuthenticated (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function isUserAuthorizated(types) {
    return function (req, res, next) {
        const userRole = Number(req.session.user.role);

        if (types.includes(userRole)) {
            next();
        } else {
            res.status(403).send('Acesso negado');
        }
    }
}

module.exports = function({ initials }) {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {

            const profile = req.session.user ? req.session.user.role : null;

            switch (profile) {
                case '3':
                    res.render('register-user', {
                        initials: initials
                    });
                    break;

                case '2':
                    res.render('record-queue', {
                        initials: initials
                    });
                    break;

                case '1':
                    res.render('risk-classification', {
                        initials: initials
                    });
                    break;

                case '0':
                    res.render('register-patient', {
                        initials: initials
                        });
                        break;

                default:
                    res.redirect('login');
                    break;
            }
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.get('/login', (req, res, next) => {
        try {
            res.render('login');
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.post('/login', (req, res, next) => {
        try {
            userObject = {username: req.body.inputUsername, password: req.body.inputPassword};
            check = databaseQueries.checkUser(userObject);

            if (check == 0) {
                req.session.user = {username: userObject.username, role: databaseQueries.getUserRole(userObject.username)};
                res.json({redirect: '/'});
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

    // Admin routes
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

    // Attendant routes
    router.get('/register-patient', isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            res.render('register-patient', {
                initials: initials
                });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.post('/register-patient', isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            console.log(req.body)
        } catch(err) {
            console.error(`Error while getting page `, err.message);
            next(err);
        }
    });

    router.get('/register-record', isAuthenticated, isUserAuthorizated([0]), (req, res, next) => {
        try {
            res.render('register-record', {
                initials: initials
                });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    // Risk classification routes
    router.get('/risk-classification', isAuthenticated, isUserAuthorizated([1]), (req, res, next) => {
        try {
            res.render('risk-classification', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    // Doctor routes
    router.get('/record-queue', isAuthenticated, isUserAuthorizated([2]), (req, res, next) => {
        try {
            res.render('record-queue', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.get('/edit-record', isAuthenticated, isUserAuthorizated([1, 2]), (req, res, next) => {
        try {
            res.render('edit-record', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.get('/edit-record-doctor', isAuthenticated, isUserAuthorizated([2]), (req, res, next) => {
        try {
            res.render('edit-record-doctor', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    router.get('/configurations', isAuthenticated, (req, res, next) => {
        try {
            res.render('configurations', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

    return router;
};