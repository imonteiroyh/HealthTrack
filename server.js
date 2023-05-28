const app = require('./config/express')();
const port = app.get('port');
const router = require('./routes/routing')

var initials = 'VM';
var profile;

const databaseQueries = require('./services/database-queries')


app.get('/debug', (req, res, next) => {
    try {
        let username = 'admin';
        let password = 'admin';
        res.json(databaseQueries.checkUser({username, password}));
    } catch(error) {
        console.error(`Error while getting databaseQueries - `, error.message);
        next(error);
    }
});


app.post('/debug', (req, res, next) => {
    try {
        // res.json(databaseQueries.createUser(req.body));
    } catch(err) {
        console.error(`Error while adding databaseQueries - `, err.message);
        next(err);
    }
});

app.use('/', router({ initials }));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});