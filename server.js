const app = require('./config/express')();
const port = app.get('port');
const router = require('./routes/routing')

app.use('/', router());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});