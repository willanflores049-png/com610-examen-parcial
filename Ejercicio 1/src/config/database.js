const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const caPath = path.resolve(__dirname, '../../global-bundle.pem');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        ca: fs.readFileSync(caPath),
        rejectUnauthorized: true
    },

    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0
});

module.exports = pool;
