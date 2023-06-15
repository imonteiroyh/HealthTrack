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
        const userPassword = req.body.userPassword

        const hashedPassword = await hashPassword(userPassword);

        // Fazer tratamento adequado baseado na resposta de hashedPassword
        res.status(200).json(hashedPassword);
    }));

router.route('/registerUser')
    .post(asyncHandler(async (req, res) => {
        const userObject = req.body

        const result = await databaseQueries.registerUser(userObject);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/removeUser')
    .post(asyncHandler(async (req, res) => {
        const username = req.body.username

        const result = await databaseQueries.removeUser(username);

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));

router.route('/removePatient')
    .post(asyncHandler(async (req, res) => {
        const cpf = req.body.cpf
        console.log(cpf)

        const result = await databaseQueries.removePatient(cpf);
        console.log(result)

        // Fazer tratamento adequado baseado na resposta de result
        res.status(200).json(result);
    }));


app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor do banco de dados rodando na porta ${port}`);
});