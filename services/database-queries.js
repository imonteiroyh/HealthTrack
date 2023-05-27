const database = require('./database');

function getUsers() {
    const data = database.query(`SELECT * FROM users LIMIT ?`, [5]);

    return data;
}

function validateCreateUser() {
    let messages = [];

    console.log(users);

    if (!users) {
        messages.push('No object is provided');
    }

    if (!users.username) {
        messages.push('Username is empty');
    }

    // CHECK IF USERNAME IS IN USE

    if (!users.hash) {
        messages.push('Hash is empty');
    }

    if (messages.length) {
        let error = new Error(messages.join());

        error.statusCode = 400;

        throw error;
    }
}

function createUser(userObject) {
    validateCreateUser(userObject);

    const {username, hash} = userObject;
    const result = database.run('INSERT INTO users (username, hash) VALUES (?, ?)', {username, hash});

    let message = 'Error in creating username';
    if (result.changes) {
        message = 'Username created sucessfully';
    }

    return {message};
}

module.exports = {
    getUsers,
    createUser
}