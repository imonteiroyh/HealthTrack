const express = require('express');
const asyncHandler = require('express-async-handler')
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../services/authentication');

const databaseQueries = require('../services/database-queries');

router.route('/record-queue')
    .get(isAuthenticated, isUserAuthorizated([2]), asyncHandler(async (req, res) => {
        const records = await databaseQueries.getRecordsByStage(1)

        res.render('record-queue', {
            initials: req.session.user.initials,
            records: records
        });
    }));

router.route('/edit-record-doctor')
    .get(isAuthenticated, isUserAuthorizated([2]), asyncHandler(async (req, res) => {
        res.render('edit-record-doctor', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([2]), asyncHandler(async (req, res) => {
        res.status(200).json({message: 'Em construção!'});
    }));

module.exports = router;