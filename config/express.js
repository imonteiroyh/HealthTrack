const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(sessions({
        secret: 'th1515453cr3tk3y',
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false
    }));

    app.use(express.static('public'))
    app.set('view engine', 'ejs');
    app.set('views', './routes');

    return app;
};