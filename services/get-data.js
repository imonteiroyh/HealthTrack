const config = require('../config/default.json');
const address = config.database.address
const port = config.database.port

async function fetchData(route, body) {
    try {
        const completeURL = `${address}${port}${route}`;

        const response = await fetch(completeURL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    fetchData
}