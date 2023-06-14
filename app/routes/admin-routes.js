const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../../services/authentication');

const databaseQueries = require('../../services/database-queries');

const { hashPassword } = require('../../services/cryptography');

router.route('/register-user')
    .get(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        res.render('register-user', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        const adminObject = {
            username: req.session.user.username,
            password: req.body.inputAdminPassword
        };

        const check = await databaseQueries.checkPassword(adminObject);

        if (check == 0) {

            const hashedPassword = await hashPassword(req.body.inputUserPassword);

            const userObject = {
                name: req.body.inputName,
                lastName: req.body.inputLastName,
                username: req.body.inputUsername,
                email: req.body.inputEmail,
                hash: hashedPassword,
                role: req.body.selectRole
            };

            const result = await databaseQueries.registerUser(userObject);

            if (result == 0) {
                res.status(200).json({message: 'Usuário cadastrado com sucesso!', type: 'success', redirect: '/register-user'});
            } else {
                res.status(200).json({message: 'Erro ao cadastrar usuário!', type: 'failure'});
            }

        } else {
            res.status(200).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
        }
    }));

router.route('/remove-user')
    .get(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        res.render('remove-user', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        const adminObject = {
            username: req.session.user.username,
            password: req.body.inputAdminPassword
        };

        const check = await databaseQueries.checkPassword(adminObject);

        if (check == 0) {
            const username = req.body.inputUsername;
            const result = await databaseQueries.removeUser(username);

            if (result == 0) {
                res.status(200).json({message: 'Usuário removido com sucesso!', type: 'success', redirect: '/remove-user'});
            } else {
                res.status(200).json({message: 'Erro ao remover usuário!', type: 'failure'});
            }

        } else {
            res.status(200).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
        }
    }));

router.route('/remove-patient')
    .get(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        res.render('remove-patient', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, isUserAuthorizated([3]), asyncHandler(async (req, res) => {
        const adminObject = {
            username: req.session.user.username,
            password: req.body.inputAdminPassword
        };

        const check = await databaseQueries.checkPassword(adminObject);

        if (check == 0) {
            const cpf = req.body.inputCPF;
            const result = await databaseQueries.removePatient(cpf);

            if (result == 0) {
                res.status(200).json({message: 'Paciente removido com sucesso!', type: 'success', redirect: '/remove-patient'});
            } else {
                res.status(200).json({message: 'Erro ao remover paciente!', type: 'failure'});
            }

        } else {
            res.status(200).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
        }
    }));

module.exports = router;