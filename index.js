const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }
    console.log('Connection established');
});
