const express = require('express');

const profiles = [
    'admin', 'doctor', 'risk-classification', 'attendant'
]

module.exports = function({profile, initials}) {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            switch (profile) {
                case profiles[0]:
                    res.render('register-user', {
                        initials: initials
                    });
                    break;

                case profiles[1]:
                    res.render('record-queue', {
                        initials: initials
                    });
                    break;

                case profiles[2]:
                    res.render('risk-classification', {
                        initials: initials
                    });
                    break;

                case profiles[3]:
                    res.render('register-patient', {
                        initials: initials
                        });
                        break;

                default:
                    res.render('login');
                    break;
            }
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/login', (req, res, next) => {
        try {
            res.render('login');
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    // Admin routes
    router.get('/register-user', (req, res, next) => {
        try {
            res.render('register-user', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/remove-user', (req, res, next) => {
        try {
            res.render('remove-user', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/remove-patient', (req, res, next) => {
        try {
            res.render('remove-patient', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    // Attendant routes
    router.get('/register-patient', (req, res, next) => {
        try {
            res.render('register-patient', {
                initials: initials
                });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/register-record', (req, res, next) => {
        try {
            res.render('register-record', {
                initials: initials
                });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    // Risk classification routes
    router.get('/risk-classification', (req, res, next) => {
        try {
            res.render('risk-classification', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    // Doctor routes
    router.get('/record-queue', (req, res, next) => {
        try {
            res.render('record-queue', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/visualization', (req, res, next) => {
        try {
            res.render('visualization', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/edit-record', (req, res, next) => {
        try {
            res.render('edit-record', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/edit-record-doctor', (req, res, next) => {
        try {
            res.render('edit-record-doctor', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    router.get('/configurations', (req, res, next) => {
        try {
            res.render('configurations', {
                initials: initials
            });
        } catch(error) {
            console.error(`Error while getting page - `, error.message);
            next(error);
        }
    });

    return router;
};