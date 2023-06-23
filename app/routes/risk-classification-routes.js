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
    }))

    .post(isAuthenticated, isUserAuthorizated([1]), asyncHandler(async (req, res) => {
        const recordObject = {
            record_id : req.body.inputRecordId,
            arterial_pressure : req.body.inputPressure,
            temperature : req.body.inputTemperature,
            description : req.body.inputDescription,
            risk : req.body.selectRisk,
            stage : 0
        }

        const result = await fetchData('/editRecordRC', recordObject);

        if (result == 0) {
            res.status(200).json({message: 'Risco classificado com sucesso!', type: 'success'});
        } else {
            res.status(400).json({message: 'Erro ao cadastrar paciente!', type: 'failure'});
        }
    }));

module.exports = router;