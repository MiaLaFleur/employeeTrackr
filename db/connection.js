const mysql = require('mysql2');
const { user, password } = require('../myInfo');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: user,
        password: password,
        database: 'company'
    },
    console.log('Connected to the company database.')
);

module.exports = db;