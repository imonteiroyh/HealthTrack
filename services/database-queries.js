const database = require('../database/database');

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

    const userInfo = result[0];

    return userInfo;
}

function validateUsername(username) {
    const result = database.query('SELECT COUNT(*) AS n FROM users WHERE username = (?)', [username])[0].n;

    return result;
}

function registerUser(userInfo) {
    const {name, lastName, username, email, hash, role} = userInfo;
    const validate = validateUsername(username);

    if (validate === 0) {

        const initials = `${
            name.length > 0 ? name.charAt(0).toUpperCase() : ''
        }${
            lastName.length > 0 ? lastName.charAt(0).toUpperCase() : ''
        }`;

        const result = database.run('INSERT INTO users (name, lastName, initials, username, email, hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, lastName, initials, username, email, hash, role]);

        if (result.changes) {
            return 0;
        }

    }

    return 1;
}

function removeUser(username) {
    const result = database.run('DELETE FROM users WHERE username = (?)', [username]);

    if (result.changes) {
        return 0;
    } else {
        return 1;
    }
}

function validateCPF(cpf) {
    const result = database.query('SELECT COUNT(*) AS n FROM users WHERE cpf = (?)', [cpf])[0].n;

    return result;
}

function registerPatient(patientInfo) {
    const {name, birthday, cpf, email, address, phone} = patientInfo;
    const validate = validateCPF(cpf);

    if (validate === 0) {

        // tratar birthday (YYYY-MM-DD) e phone (DD)12345-6789

        const result = database.run('INSERT INTO patients (name, birthday, cpf, email, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, birthday, cpf, email, address, phone]);

        if (result.changes) {
            return 0;
        }

    }

    return 1;
}

function removePatient(cpf) {
    cpf = cpf.toString();
    
    const result = database.run('DELETE FROM patients WHERE cpf = (?)', [cpf]);

    if (result.changes) {
        return 0;
    } else {
        return 1;
    }
}

module.exports = {
    registerUser,
    removeUser,
    registerPatient,
    removePatient,
    checkPassword,
    getUserInfo
}