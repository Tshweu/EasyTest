const mysql = require('mysql2/promise')

let con = mysql.createPool({
    host: "localhost",
    user: "vps",
    password: "dev@vintage",
    database: "easytest",
    multipleStatements: false
});

module.exports = con;