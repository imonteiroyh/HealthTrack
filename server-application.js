const app = require('./config/express')();
const port = app.get('port');
const router = require('./app/routes/routing')

app.use('/', router());

app.listen(port, () => {
    console.log(`Servidor da aplicação rodando na porta ${port}`);
});