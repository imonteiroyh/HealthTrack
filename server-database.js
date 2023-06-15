const app = require('./config/express')();
const config = require('config');
const port = process.env.PORT || config.get('server.port_database');
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const databaseQueries = require('./services/database-queries');

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

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor do banco de dados rodando na porta ${port}`);
});