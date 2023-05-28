const database = require('../database/database');


function getUsers() {
    let username = '123451345';
    // const data = database.query('SELECT * FROM users WHERE username = (?)', [username]);
    const data = database.query('SELECT * FROM users', []);

    // let hash = '12313'
    // createUser({username, hash})

    return data;
}

function validateUsername(userInfo) {
    const {username, _} = userInfo;
    const result = database.query('SELECT COUNT(*) AS n FROM users WHERE username = (?)', [username])[0].n;

    return result
}

function registerUser(userInfo) {
    let validate = validateUsername(userInfo);

    if (validate === 0) {
        const {name, lastName, username, email, hash, role} = userObject;

        const initials = `${
            name.length > 0 ? name.charAt(0).toUpperCase() : ''
        }${
            lastName.length > 0 ? lastName.charAt(0).toUpperCase() : ''
        }`;

        const result = database.run('INSERT INTO users (name, lastName, initials, username, email, hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, lastName, initials, username, email, hash, role]);

        if (result.changes) {
            return 0
        }

    } else {
        return 1
    }
}

function checkPassword(userInfo) {
    const {username, password} = userInfo;
    const result = database.query('SELECT hash FROM users WHERE username = (?)', [username]);

    if (result.length == 0) {
        return 1;
    }

    if (result[0].hash != password) {
        return 2;
    }

    return 0;
}

function getUserInfo(username) {
    const result = database.query('SELECT initials, username, role FROM users WHERE username = (?)', [username]);

    if (result.length == 0) {
        return 1;
    }

    userInfo = result[0]

    return userInfo
}

module.exports = {
    getUsers,
    registerUser,
    checkPassword,
    getUserInfo
}