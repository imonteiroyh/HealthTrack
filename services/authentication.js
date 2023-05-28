function isAuthenticated (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function isUserAuthorizated(types) {
    types = [0, 1, 2, 3];
    return function (req, res, next) {
        const userRole = Number(req.session.user.role);

        if (types.includes(userRole)) {
            next();
        } else {
            res.status(403).send('Acesso negado');
        }
    }
}

module.exports = {
    isAuthenticated,
    isUserAuthorizated
};