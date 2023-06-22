const app = require('./config/express')();
const config = require('config');
const port = config.get('database.port');
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const databaseQueries = require('./services/database-queries');
const { hashPassword } = require('./services/cryptography');

router.route('/api')
    .get((req, res) => {
        res.send('Hello, World!');
    });

router.route('/checkPassword')
    .post(asyncHandler(async (req, res) => {
        const userObject = {
            username: req.body.username,
            password: req.body.password
        };

        const check = await databaseQueries.checkPassword(userObject);

        // Fazer tratamento adequado baseado na resposta de check
        res.status(200).json(check);
    }));

router.route('/changePassword')
    .post(asyncHandler(async (req, res) => {
        const newPasswordObject = req.body;

        const result = await databaseQueries.changePassword(newPasswordObject);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/getUserInfo')
    .post(asyncHandler(async (req, res) => {
        const userObject = {
            username: req.body.username,
            password: req.body.password
        };

        const userInfo = await databaseQueries.getUserInfo(userObject.username);

        // Fazer tratamento adequado baseado na resposta de userInfo
        res.status(200).json(userInfo);
    }));

router.route('/hashPassword')
    .post(asyncHandler(async (req, res) => {
        const userPassword = req.body.userPassword;

        const hashedPassword = await hashPassword(userPassword);

        // Fazer tratamento adequado baseado na resposta de hashedPassword
        res.status(200).json(hashedPassword);
    }));

router.route('/registerUser')
    .post(asyncHandler(async (req, res) => {
        const userObject = req.body;

        const result = await databaseQueries.registerUser(userObject);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/removeUser')
    .post(asyncHandler(async (req, res) => {
        const username = req.body.username;

        const result = await databaseQueries.removeUser(username);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/removePatient')
    .post(asyncHandler(async (req, res) => {
        const cpf = req.body.cpf;

        const result = await databaseQueries.removePatient(cpf);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/registerPatient')
    .post(asyncHandler(async (req, res) => {
        const patientObject = req.body;

        const result = await databaseQueries.registerPatient(patientObject);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));


router.route('/registerRecord')
    .post(asyncHandler(async (req, res) => {
        const cpf = req.body.cpf;

        const result = await databaseQueries.registerRecord(cpf);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/getRecordsByStage')
    .post(asyncHandler(async (req, res) => {
        const stage = req.body.stage;

        const records = await databaseQueries.getRecordsByStage(stage);

        // Fazer tratamento adequado baseado na resposta de records
        res.status(200).json(records);
    }));

router.route('/editRecordRC')
    .post(asyncHandler(async (req, res) => {
        recordObject = req.body

        const records = await databaseQueries.editRecordRC(recordObject);

        // Fazer tratamento adequado baseado na resposta de records
        res.status(200).json(records);
    }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor do banco de dados rodando na porta ${port}`);
});