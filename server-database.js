const app = require('./config/express')();
const config = require('config')
const port = process.env.PORT || config.get('server.port_database');

app.listen(port, () => {
    console.log(`Servidor do banco de dados rodando na porta ${port}`);
});