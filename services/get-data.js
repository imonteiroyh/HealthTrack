const config = require('../config/default.json');
const address = config.database.address
const port = config.database.port

async function fetchData(route, body, method) {
    try {
        const completeURL = `${address}${port}${route}`;

        var response;

        switch (method) {
            case 'DELETE':
                response = await fetch(completeURL, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                break;

            case 'GET':
                response = await fetch(completeURL, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                break;

            case 'POST':
                response = await fetch(completeURL, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                break;

            case 'PUT':
                response = await fetch(completeURL, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                break;
        }


        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    fetchData
}