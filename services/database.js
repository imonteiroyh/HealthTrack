const sqlite = require('better-sqlite3');
const path = require('path');
const database = new sqlite(path.resolve('data', 'healthtrack.db'), {fileMustExist: true});

function query(command, parameters) {
	return database.prepare(command).all(parameters);
}

function run(command, parameters) {
    return database.prepare(command).run(parameters);
}

module.exports = {
    query,
    run
}