const database = require('../database/database');

const { checkHashedPassword } = require('./cryptography');

async function countUsers() {
    const result = await database.query('SELECT COUNT(*) AS n FROM users', [])[0].n;

    return result;
}

async function createTables() {
    const createTableUsers = `
        CREATE TABLE IF NOT EXISTS users (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
        'name' TEXT,
        'lastName' TEXT,
        'initials' TEXT,
        'username' TEXT NOT NULL UNIQUE,
        'email' TEXT UNIQUE,
        'hash' TEXT NOT NULL,
        'role' TEXT NOT NULL
    );`;

    const createTablePatients = `
        CREATE TABLE IF NOT EXISTS patients (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
        'name' TEXT NOT NULL,
        'birthday' TEXT,
        'cpf' TEXT NOT NULL UNIQUE,
        'email' TEXT UNIQUE,
        'address' TEXT,
        'phone' TEXT
    );`;

    const createTableRecords = `
        CREATE TABLE IF NOT EXISTS records (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
        'patient_id' INTEGER NOT NULL,
        'arterial_pressure' TEXT,
        'temperature' TEXT,
        'description' TEXT,
        'risk' INTEGER,
        'stage' INTEGER DEFAULT 0,
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
    );`;

    await database.exec(createTableUsers);
    await database.exec(createTablePatients);
    await database.exec(createTableRecords);
}

async function validateCPF(cpf) {
    const result = await database.query('SELECT COUNT(*) AS n FROM patients WHERE cpf = (?)', [cpf])[0].n;

    return result;
}

async function validateUsername(username) {
    const result = await database.query('SELECT COUNT(*) AS n FROM users WHERE username = (?)', [username])[0].n;

    return result;
}

async function validateEmail(email) {
    const result = await database.query('SELECT COUNT(*) AS n FROM users WHERE email = (?)', [email])[0].n;

    return result;
}

async function getPatientId(cpf) {
    const result = await database.query('SELECT id FROM patients WHERE cpf = (?)', [cpf])[0].id;

    return result;
}

async function registerUser(userInfo) {
    const {name, lastName, username, email, hash, role} = userInfo;

    const validateUsernameConst = await validateUsername(username);
    if (validateUsernameConst != 0) {
        return 1;
    }

    const validateEmailConst = await validateEmail(email);
    if (validateEmailConst != 0) {
        return 2;
    }

    const initials = `${
        name.length > 0 ? name.charAt(0).toUpperCase() : ''
    }${
        lastName.length > 0 ? lastName.charAt(0).toUpperCase() : ''
    }`;

    const result = await database.run('INSERT INTO users (name, lastName, initials, username, email, hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, lastName, initials, username, email, hash, role]);

    if (result.changes) {
        return 0;
    } else {
        return 3;
    }

}

async function removeUser(username) {
    const validateUsernameConst = await validateUsername(username);
    if (validateUsernameConst == 0) {
        return 1;
    }

    const result = await database.run('DELETE FROM users WHERE username = (?)', [username]);

    if (result.changes) {
        return 0;
    } else {
        return 2;
    }
}

async function registerPatient(patientInfo) {
    const {name, cpf, email, birthday, address, phone} = patientInfo;

    const validateCPFConst = await validateCPF(cpf);
    if (validateCPFConst != 0) {
        return 1;
    }
    const validateEmailConst = await validateEmail(email);
    if (validateEmailConst != 0) {
        return 2;
    }

    const result = await database.run('INSERT INTO patients (name, birthday, cpf, email, address, phone) VALUES (?, ?, ?, ?, ?, ?)', [name, birthday, cpf, email, address, phone]);

    if (result.changes) {
        return 0;
    } else {
        return 3;
    }
}

async function removePatient(cpf) {
    const validateCPFConst = await validateCPF(cpf);
    if (validateCPFConst == 0) {
        return 1;
    }

    const result = await database.run('DELETE FROM patients WHERE cpf = (?)', [cpf]);

    if (result.changes) {
        return 0;
    } else {
        return 2;
    }
}

async function registerRecord(cpf) {
    const validateCPFConst = await validateCPF(cpf);
    if (validateCPFConst == 0) {
        return 1;
    }

    const patientId = await getPatientId(cpf);
    const result = await database.run('INSERT INTO records (patient_id) VALUES (?)', [patientId]);

    if (result.changes) {
        return 0;
    } else {
        return 2;
    }
}

async function checkPassword(userInfo) {
    const {username, password} = userInfo;

    const result = await database.query('SELECT hash FROM users WHERE username = (?)', [username]);

    if (result.length == 0) {
        return 1;
    }

    hashedPassword = result[0].hash

    const check = await checkHashedPassword(password, hashedPassword);
    if (!check) {
        return 2;
    }

    return 0;
}

async function changePassword(newPasswordInfo) {
    const {username, newPassword} = newPasswordInfo;

    const result = await database.run('UPDATE users SET hash = (?) WHERE username = (?)', [newPassword, username]);

    if (result.changes) {
        return 0;
    }

    return 1;
}

async function getUserInfo(username) {
    const result = await database.query('SELECT initials, username, role FROM users WHERE username = (?)', [username]);

    if (result.length == 0) {
        return 1;
    }

    const userInfo = result[0];

    return userInfo;
}

async function getRecordsByStage(stage) {
    const records = await database.query('SELECT records.id, records.risk, records.arterial_pressure, records.temperature, records.description, records.risk, patients.name, patients.birthday FROM records JOIN patients on records.patient_id = patients.id WHERE stage = (?)', [stage]);

    return records;
}

async function editRecordRC(recordInfo) {
    const { record_id, arterial_pressure, temperature, description, risk, stage } = recordInfo;

    const result = await database.run('UPDATE records SET arterial_pressure = (?), temperature = (?), description = (?), risk = (?), stage = (?) WHERE id = (?)', [arterial_pressure, temperature, description, risk, stage + 1, record_id]);

    if (result.changes) {
        return 0;
    }

    return 1;
}

async function editRecordD(recordInfo) {
    const { record_id, arterial_pressure, temperature, description, stage } = recordInfo;

    const result = await database.run('UPDATE records SET arterial_pressure = (?), temperature = (?), description = (?), stage = (?) WHERE id = (?)', [arterial_pressure, temperature, description, stage + 1, record_id]);

    if (result.changes) {
        return 0;
    }

    return 1;
}

async function removeRecord(recordInfo) {
    const { record_id } = recordInfo;

    const result = await database.run('DELETE FROM records WHERE id = (?)', [record_id]);

    if (result.changes) {
        return 0;
    }

    return 1;
}

module.exports = {
    countUsers,
    createTables,
    registerUser,
    removeUser,
    registerPatient,
    removePatient,
    registerRecord,
    checkPassword,
    changePassword,
    getUserInfo,
    getRecordsByStage,
    editRecordRC,
    editRecordD,
    removeRecord
}