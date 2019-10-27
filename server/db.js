var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'react',
    password : 'react',
    database : 'react'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;