const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { isAuthenticated } = require('../../services/authentication');
const { fetchData } = require('../../services/get-data');

router.route('/')
    .get(asyncHandler(async (req, res) => {
        const profile = req.session.user ? req.session.user.role : null;

        switch (profile) {
            // Admin
            case '3':
                res.redirect('/register-user');
                break;

            // Doctor
            case '2':
                res.redirect('/record-queue');
                break;

            // Risk Classification
            case '1':
                res.redirect('/risk-classification');
                break;

            // Attendant
            case '0':
                res.redirect('/register-patient');
                break;

            // Not authenticated
            default:
                res.redirect('login');
                break;
        }
    }));

router.route('/login')
    .get(asyncHandler(async (req, res) => {
        res.render('login');
    }))

    .post(asyncHandler(async (req, res) => {
        const userObject = {
            username: req.body.inputUsername,
            password: req.body.inputPassword
        };

        const check = await fetchData('/checkPassword', userObject, 'POST');

        if (check == 0) {
            const userInfo = await fetchData('/getUserInfo/' + userObject.username, '', 'GET');

            req.session.user = {
                username: userInfo.username,
                role: userInfo.role,
                initials: userInfo.initials
            };

            res.status(200).json({message: '', type: 'success', redirect: '/'});
        } else {
            res.status(200).json({message: 'Nome de usuário ou senha incorreto. Tente novamente!', type: 'failure'});
        }
    }));

router.route('/logout')
    .get(isAuthenticated, asyncHandler(async (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }));


router.route('/change-password')
    .get(isAuthenticated, asyncHandler(async (req, res) => {
        res.render('change-password', {
            initials: req.session.user.initials
        });
    }))

    .post(isAuthenticated, asyncHandler(async (req, res) => {
        const userObject = {
            username: req.session.user.username,
            password: req.body.inputPassword
        };

        const check = await fetchData('/checkPassword', userObject, 'POST');

        if (check == 0) {

            const userInfo = {
                username: req.session.user.username,
                password: req.body.inputPassword,
                newPassword: req.body.inputNewPassword,
                newPasswordConfirmation: req.body.inputNewPasswordConfirmation
            };

            if (userInfo.newPassword != userInfo.newPasswordConfirmation) {
                res.status(200).json({message: 'As novas senhas não conferem. Tente novamente!', type: 'failure'});
            }

            const userPassword = {userPassword: userInfo.newPassword};
            const hashedPassword = await fetchData('/hashPassword', userPassword, 'POST');

            const newPasswordObject = {
                username: userInfo.username,
                newPassword: hashedPassword
            };

            const result = await fetchData('/changePassword', newPasswordObject, 'PUT');

            if (result == 0) {
                res.status(200).json({message: 'Senha alterada com sucesso!', type: 'success', redirect: '/change-password'});
            } else {
                res.status(200).json({message: 'Erro ao alterar senha!', type: 'failure'});
            }

            // res.status(200).json({message: '', type: 'success', redirect: '/'});
        } else {
            res.status(200).json({message: 'Senha incorreta. Tente novamente!', type: 'failure'});
        }
    }));


module.exports = router;