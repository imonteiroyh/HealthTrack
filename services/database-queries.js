const database = require('../database/database');


function getUsers() {
    let username = '123451345';
    // const data = database.query('SELECT * FROM users WHERE username = (?)', [username]);
    const data = database.query('SELECT * FROM users', []);

    // let hash = '12313'
    // createUser({username, hash})

    return data;
}

function validateUsername(userObject) {
    const {username, _} = userObject;
    const result = database.query('SELECT COUNT(*) AS n FROM users WHERE username = (?)', [username])[0].n;

    return result;
}

function createUser(userObject) {
    let validate = validateUsername(userObject);

    let message = 'Error in creating username';
    if (validate === 0) {
        const {username, hash} = userObject;
        const result = database.run('INSERT INTO users (username, hash) VALUES ?, ?', {username, hash});

        if (result.changes) {
            message = 'Username created sucessfully';
        }

        return {message};
    } else {
        message = 'Username already in use';
    }

    return message;
}



////////////////////////////////////////////////////////

function checkUser(userObject) {
    const {username, password} = userObject;
    const result = database.query('SELECT hash FROM users WHERE username = ?', [username]);

    if (result.length == 0) {
        return 1;
    }

    if (result[0].hash != password) {
        return 2;
    }

    return 0;
}

function getUserInfo(username) {
    const result = database.query('SELECT initials, username, role FROM users WHERE username = ?', [username]);

    if (result.length == 0) {
        return 1;
    }

    userInfo = result[0]

    return userInfo
}

module.exports = {
    getUsers,
    createUser,
    checkUser,
    getUserInfo
}