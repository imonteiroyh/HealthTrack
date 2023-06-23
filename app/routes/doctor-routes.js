const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../../services/authentication');
const { fetchData } = require('../../services/get-data');

router.route('/record-queue')
    .get(isAuthenticated, isUserAuthorizated([2]), asyncHandler(async (req, res) => {
        const stage = {stage: 1};

        const records = await fetchData('/getRecordsByStage', stage);

        res.render('record-queue', {
            initials: req.session.user.initials,
            records: records
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([2]), asyncHandler(async (req, res) => {
        const recordObject = {
            record_id : req.body.inputRecordId,
            arterial_pressure : req.body.inputPressure,
            temperature : req.body.inputTemperature,
            description : req.body.inputDescription,
            stage : 1
        }

        const result = await fetchData('/editRecordD', recordObject);

        if (result == 0) {
            res.status(200).json({message: 'Consulta salva com sucesso!', type: 'success'});
        } else {
            res.status(400).json({message: 'Erro ao salvar consulta!', type: 'failure'});
        }
    }));

module.exports = router;