const { hashPassword } = require('../services/cryptography');
const databaseQueries = require('../services/database-queries');

async function initializeDatabase() {

    const hashedPassword = await hashPassword('admin');
    const userObject = {
        name: '',
        lastName: '',
        username: 'admin',
        email: '',
        hash: hashedPassword,
        role: '3'
    };
    
    const result = await databaseQueries.registerUser(userObject);

    if (result == 0) {
        console.log('Banco de dados inicializado com sucesso.')
    } else {
        console.log('Houve um erro ao inicializar o banco de dados.')
    }
}

initializeDatabase()