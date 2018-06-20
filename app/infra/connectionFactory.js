var mysql = require("mysql");

var connectMySQL = function() {
   return  mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "",
        database : "casadocodigo_nodejs"
    });
}

module.exports = function() {
    return connectMySQL;
}

