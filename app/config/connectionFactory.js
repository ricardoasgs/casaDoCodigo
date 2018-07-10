var mysql = require("mysql");
require('dotenv').config();

var connectMySQL = function () {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

module.exports = function () {
    return connectMySQL;
}

