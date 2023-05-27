const app = require('./config/express')();
const port = app.get('port');
const router = require('./routes/routing')

var initials = 'VM';
var profile;



const quotes = require('./services/database-queries')

app.get('/test', function(req, res, next) {
    try {
        res.json(quotes.getUsers(req.query));
    } catch(error) {
        console.error(`Error while getting quotes - `, error.message);
        next(error);
    }
});

/* POST quote */
app.post('/test', function(req, res, next) {
    try {
        res.json(quotes.create(req.body));
    } catch(err) {
        console.error(`Error while adding quotes - `, err.message);
        next(err);
    }
});

app.use('/', router({profile, initials}));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});