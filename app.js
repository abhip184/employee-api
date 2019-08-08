//require express and mysql
var express = require('express');
var mysql = require('mysql');
var employeeController = require('./employeeController');
var departmentController = require('./departmentController');
var salaryController = require('./salaryController');

//require controllers

var app = express();

//passing app to controllers
//listening port
var con = mysql.createConnection({
    host: "localhost",
    user :"root",
    password: "root",
    database: "test"
})

con.connect(function(err){
    if(err) throw err;
    console.log("connected to mysql");
})

employeeController(con,app);
departmentController(con,app)
salaryController(con,app)
app.listen(5000);
console.log('listening on 5000 port');