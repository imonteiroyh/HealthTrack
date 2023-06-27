const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated, isUserAuthorizated } = require('../../services/authentication');
const { fetchData } = require('../../services/get-data');

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

        const check = await fetchData('/checkPassword', adminObject, 'POST');

        if (check == 0) {

            const userPassword = {userPassword: req.body.inputUserPassword};
            const hashedPassword = await fetchData('/hashPassword', userPassword, 'POST');

            const userObject = {
                name: req.body.inputName,
                lastName: req.body.inputLastName,
                username: req.body.inputUsername,
                email: req.body.inputEmail,
                hash: hashedPassword,
                role: req.body.selectRole
            };

            const result = await fetchData('/registerUser', userObject, 'POST');

            if (result == 0) {
                res.status(200).json({message: 'Usuário cadastrado com sucesso!', type: 'success', redirect: '/register-user'});
            } else {
                res.status(result.status).json({message: result.message, type: 'failure'});
            }

        } else {
            res.status(406).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
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

        const check = await fetchData('/checkPassword', adminObject, 'POST');

        if (check == 0) {
            const username = req.body.inputUsername;
            const result = await fetchData('/removeUser/' + username, '', 'DELETE');

            if (result == 0) {
                res.status(200).json({message: 'Usuário removido com sucesso!', type: 'success', redirect: '/remove-user'});
            } else {
                res.status(result.status).json({message: result.message, type: 'failure'});
            }
            
        } else {
            res.status(406).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
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

        const check = await fetchData('/checkPassword', adminObject, 'POST');

        if (check == 0) {
            const cpf = (req.body.inputCPF).toString();
            const result = await fetchData('/removePatient/' + cpf, '', 'DELETE');

            if (result == 0) {
                res.status(200).json({message: 'Paciente removido com sucesso!', type: 'success', redirect: '/remove-patient'});
            } else {
                res.status(result.status).json({message: result.message, type: 'failure'});
            }

        } else {
            res.status(406).json({message: 'As informações do administrador estão incorretas!', type: 'failure'});
        }
    }));

module.exports = router;