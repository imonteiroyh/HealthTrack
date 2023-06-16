const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../../services/authentication');
const { fetchData } = require('../../services/get-data');

router.route('/risk-classification')
    .get(isAuthenticated, isUserAuthorizated([1]), asyncHandler(async (req, res) => {
        const stage = {stage: 0};

        const records = await fetchData('/getRecordsByStage', stage);

        res.render('risk-classification', {
            initials: req.session.user.initials,
            records: records
        });
    }));

router.route('/edit-record')
    .get(isAuthenticated, isUserAuthorizated([1, 2]), asyncHandler(async (req, res) => {
        res.render('edit-record', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([1, 2]), asyncHandler(async (req, res) => {
        res.status(200).json({message: 'Em construção!'});
    }));

module.exports = router;