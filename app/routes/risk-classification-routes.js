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
        const classifiObject ={
            name : req.body.inputName,
            patient_id : req.body.inputId,
            arterial_pressure : req.body.inputPressure,
            description : req.body.inputDescription,
            temperature : req.body.inputTemperature,
            risk : req.body.selectRisk,
        }

        const result = await fetchData('/riskClassification', classifiObject);
        console.log(classifiObject)
        console.log(result)

        if (result == 0) {
            res.status(200).json({message: 'Classificação de risco cadastrado com sucesso!', type: 'success', redirect: '/risk-classification'});
        } else {
            res.status(400).json({message: 'Erro ao cadastrar paciente!', type: 'failure'});
        }
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