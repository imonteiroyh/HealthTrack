const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../../services/authentication');
const { fetchData } = require('../../services/get-data');

router.route('/register-patient')
    .get(isAuthenticated, isUserAuthorizated([0]), asyncHandler(async (req, res) => {
        res.render('register-patient', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([0]), asyncHandler(async (req, res) => {
        const patientObject = {
            name: req.body.inputName,
            cpf: req.body.inputCPF,
            email: req.body.inputEmail,
            birthday: req.body.inputBirthday,
            address: req.body.inputAddress,
            phone: req.body.inputPhone
        };

        const result = await fetchData('/registerPatient', patientObject, 'POST');

        if (result == 0) {
            res.status(200).json({message: 'Paciente cadastrado com sucesso!', type: 'success', redirect: '/register-patient'});
        } else {
            res.status(result.status).json({message: result.message, type: 'failure'});
        }
    }));

router.route('/register-record')
    .get(isAuthenticated, isUserAuthorizated([0]), asyncHandler(async (req, res) => {
        res.render('register-record', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([0]), asyncHandler(async (req, res) => {
        const cpf = {cpf: req.body.inputCPF};

        const result = await fetchData('/registerRecord', cpf, 'POST')

        if (result == 0) {
            res.status(200).json({message: 'Consulta cadastrada com sucesso!', type: 'success', redirect: '/register-record'});
        } else {
            res.status(result.status).json({message: result.message, type: 'failure'});
        }
    }));

module.exports = router;