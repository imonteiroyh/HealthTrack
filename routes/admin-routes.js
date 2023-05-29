const express = require('express');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

const databaseQueries = require('../services/database-queries');

router.route('/register-user')
    .get(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            res.render('register-user', {
                initials: req.session.user.initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    })

    .post(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            const adminObject = {
                username: req.session.user.username,
                password: req.body.inputAdminPassword
            };

            const check = databaseQueries.checkPassword(adminObject);

            if (check == 0) {
                // hash inputuserpassord before send to userobject
                const userObject = {
                    name: req.body.inputName,
                    lastName: req.body.inputLastName,
                    username: req.body.inputUsername,
                    email: req.body.inputEmail,
                    hash: req.body.inputUserPassword,
                    role: req.body.selectRole
                };

                const result = databaseQueries.registerUser(userObject);

                if (result == 0) {
                    console.log('usuário registrado');
                    res.redirect('/register-user');
                } else {
                    console.log('erro ao cadastrar usuário');
                }

            } else if (check == 1) {
                console.log('erro no username do admin');
            } else {
                console.log('admin password não bate');
            }

        } catch(err) {
            console.error(`Error while getting page `, err.message);
            next(err);
        }
    });

router.route('/remove-user')
    .get(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            res.render('remove-user', {
                initials: req.session.user.initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    })

    .post(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            const adminObject = {
                username: req.session.user.username,
                password: req.body.inputAdminPassword
            };

            const check = databaseQueries.checkPassword(adminObject);

            if (check == 0) {
                const username = req.body.inputUsername;
                const result = databaseQueries.removeUser(userObject);

                if (result == 0) {
                    console.log('usuário removido');
                    res.redirect('/remove-user');
                } else {
                    console.log('erro ao remover usuário');
                }

            } else if (check == 1) {
                console.log('erro no username do admin');
            } else {
                console.log('admin password não bate');
            }

        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }

    });

router.route('/remove-patient')
    .get(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            res.render('remove-patient', {
                initials: req.session.user.initials
            });
        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    })

    .post(isAuthenticated, isUserAuthorizated([3]), (req, res, next) => {
        try {
            const adminObject = {
                username: req.session.user.username,
                password: req.body.inputAdminPassword
            };

            const check = databaseQueries.checkPassword(adminObject);
            console.log(check)

            if (check == 0) {
                const cpf = req.body.inputCPF;
                const result = databaseQueries.removePatient(cpf);

                if (result == 0) {
                    console.log('paciente removido');
                    res.redirect('/remove-user');
                } else {
                    console.log('erro ao remover paciente');
                }

            } else if (check == 1) {
                console.log('erro no username do admin');
            } else {
                console.log('admin password não bate');
            }

        } catch(error) {
            console.error(`Error while getting page `, error.message);
            next(error);
        }
    });

module.exports = router;