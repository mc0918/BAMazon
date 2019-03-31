require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");

//Acess password to MySql
//remember to specify in the readme that someone cloning the repo
//will need to make their own .env file with their own password for this program to work
const pass = require("./password");
const password = pass.password.id;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

console.log("database loaded!");
