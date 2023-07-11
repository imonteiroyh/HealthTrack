const fs = require('fs')
const path = require('path')
const { hashPassword } = require('../services/cryptography');

function createDatabase() {
    const fileName = 'healthtrack.db';
    const filePath = path.join(__dirname, fileName);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log('Banco de dados criado com sucesso.');
    }
}

async function initializeDatabase() {
    
    createDatabase();

    const databaseQueries = require('../services/database-queries');

    await databaseQueries.createTables();
    
    const hashedPassword = await hashPassword('admin');
    const userObject = {
        name: '',
        lastName: '',
        username: 'admin',
        email: '',
        hash: hashedPassword,
        role: '3'
    };

    const count = await databaseQueries.countUsers();
    let result = 0;

    if (count == 0) {
        result = await databaseQueries.registerUser(userObject);
    }
    
    
    if (result == 0) {
        console.log('Banco de dados inicializado com sucesso.')
    } else {
        console.log('Houve um erro ao inicializar o banco de dados.')
    }
}

initializeDatabase()