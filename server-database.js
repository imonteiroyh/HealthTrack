const app = require('./config/express')();
const config = require('config');
const port = config.get('database.port');
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const databaseQueries = require('./services/database-queries');
const { hashPassword } = require('./services/cryptography');

router.route('/checkPassword')
    .post(asyncHandler(async (req, res) => {
        const userObject = {
            username: req.body.username,
            password: req.body.password
        };

        const check = await databaseQueries.checkPassword(userObject);

        if(check == 0){
            res.status(200).json(check);
        }
        else if(check == 2){
            res.status(406).json({message: 'Senha incorreta!', type: 'failure', status: 406});
        }
        else{
            res.status(404).json({message: 'Senha armazenada não foi encontrada', type: 'failure', status: 404});
        }
    }));

router.route('/changePassword')
    .put(asyncHandler(async (req, res) => {
        const newPasswordObject = req.body;

        const result = await databaseQueries.changePassword(newPasswordObject);

        if(result == 0){
            res.status(200).json(result);
        }
        else{
            res.status(500).json({message: 'Erro ao  alterar a senha!', type: 'failure', status: 500});
        }
    }));

router.route('/getUserInfo/:username')
    .get(asyncHandler(async (req, res) => {
        username = req.params.username

        const userInfo = await databaseQueries.getUserInfo(username);

        if(userInfo == 1){
            res.status(404).json({message: 'Informações do usuário não foram encontradas!', type: 'failure', status: 404});
        }
        else{
            res.status(200).json(userInfo);
        }
    }));

router.route('/hashPassword')
    .post(asyncHandler(async (req, res) => {
        const userPassword = req.body.userPassword;

        const hashedPassword = await hashPassword(userPassword);

        if(hashedPassword){
            res.status(200).json(hashedPassword);
        }
        else{
            res.status(500).json({message: 'Erro ao codificar senha!', type: 'failure', status: 500});
        }
    }));

router.route('/registerUser')
    .post(asyncHandler(async (req, res) => {
        const userObject = req.body;

        const result = await databaseQueries.registerUser(userObject);

        if(result == 1){
            res.status(409).json({message: 'Nome de usuário já está em uso!', type: 'failure', status:409});
        }
        else if(result == 2){
            res.status(409).json({message: 'Email já está em uso!', type: 'failure', status: 409});
        }
        else if(result == 0){
            res.status(200).json(result);
        }
        else{
            res.status(500).json({message: 'Erro ao  cadastrar usuário!', type: 'failure', status: 500});
        }
    }));

router.route('/removeUser/:username')
    .delete(asyncHandler(async (req, res) => {
        const username = req.params.username;

        const result = await databaseQueries.removeUser(username);

        if(result == 1){
            res.status(404).json({message: 'Nome de usuário não encontrado!', type: 'failure', status: 404});
        }
        else if(result == 0){
            res.status(200).json(result);
        }
        else{
            res.status(500).json({message: 'Erro ao  remover usuário!', type: 'failure', status: 500});
        }
    }));

router.route('/removePatient/:cpf')
    .delete(asyncHandler(async (req, res) => {
        const cpf = req.params.cpf;

        const result = await databaseQueries.removePatient(cpf);

        if(result == 1){
            res.status(404).json({message: 'CPF do paciente não encontrado!', type: 'failure', status: 404});
        }
        else if(result == 0){
            res.status(200).json(result);
        }
        else{
            res.status(500).json({message: 'Erro ao  remover paciente!', type: 'failure', status: 500});
        }
    }));

router.route('/registerPatient')
    .post(asyncHandler(async (req, res) => {
        const patientObject = req.body;

        const result = await databaseQueries.registerPatient(patientObject);

        if(result == 1){
            res.status(409).json({message: 'CPF do paciente já está em uso!', type: 'failure', status: 409});
        }
        else if(result == 0){
            res.status(200).json(result);
        }
        else if(result == 2){
            res.status(409).json({message: 'Email já está em uso!', type: 'failure', status: 409});
        }
        else{
            res.status(500).json({message: 'Erro ao  cadastrar paciente!', type: 'failure', status: 500});
        }
    }));


router.route('/registerRecord')
    .post(asyncHandler(async (req, res) => {
        const cpf = req.body.cpf;

        const result = await databaseQueries.registerRecord(cpf);

        if(result == 1){
            res.status(404).json({message: 'CPF do paciente não encontrado!', type: 'failure', status: 404});
        }
        else if(result == 0){
            res.status(200).json(result);
        }
        else{
            res.status(500).json({message: 'Erro ao  cadastrar consulta!', type: 'failure', status: 500});
        }
    }));

router.route('/getRecordsByStage/:stage')
    .get(asyncHandler(async (req, res) => {
        const stage = req.params.stage;

        const records = await databaseQueries.getRecordsByStage(stage);

        if(records){
            res.status(200).json(records);
        }
        else{
            res.status(500).json({message: 'Erro ao recuperar consultas', type: 'failure', status: 500});
        }
    }));

router.route('/editRecordRC')
    .put(asyncHandler(async (req, res) => {
        recordObject = req.body;

        const records = await databaseQueries.editRecordRC(recordObject);

        if(records == 0){
            res.status(200).json(records);
        }
        else{
            res.status(500).json({message: 'Erro ao  editar a consulta!', type: 'failure', status: 500});
        }
    }));

router.route('/editRecordD')
    .put(asyncHandler(async (req, res) => {
        recordObject = req.body;

        const records = await databaseQueries.editRecordD(recordObject);

        if(records == 0){
            res.status(200).json(records);
        }
        else{
            res.status(500).json({message: 'Erro ao  editar a consulta!', type: 'failure', status: 500});
        }
    }));

router.route('/removeRecord/:record_id')
    .delete(asyncHandler(async (req, res) => {
        const recordObject = {record_id: req.params.record_id}

        const records = await databaseQueries.removeRecord(recordObject);

        if(records == 0){
            res.status(200).json(records);
        }
        else{
            res.status(500).json({message: 'Erro ao  remover consulta!', type: 'failure', status: 500});
        }
    }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor do banco de dados rodando na porta ${port}`);
});