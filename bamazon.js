require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
var Table = require("cli-table2");

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
  login();
  //connection.end();
});

console.log("database loaded!");

//Functions to be called
function login() {
  let command = `SELECT * FROM products`;
  connection.query(command, function(err, res) {
    if (err) throw err;
    var welcome = figlet.textSync("Welcome to \nBamazon!", {
      font: "colossal",
      horizontalLayout: "default",
      verticalLayout: "default"
    });
    console.log(welcome);
    //console.log(res);
    var table = new Table({ head: ["Item ID", "Product", "Price", "Units"] });

    //unfortunately you can't just loop because a new table row won't be created with each entry
    //however, when people add new things, because they're adding one at a time, this is fine
    table.push(
      [res[0].item_id, res[0].product_name, `$${res[0].price}`, res[0].units],
      [res[1].item_id, res[1].product_name, `$${res[1].price}`, res[1].units],
      [res[2].item_id, res[2].product_name, `$${res[2].price}`, res[2].units],
      [res[3].item_id, res[3].product_name, `$${res[3].price}`, res[3].units],
      [res[4].item_id, res[4].product_name, `$${res[4].price}`, res[4].units],
      [res[5].item_id, res[5].product_name, `$${res[5].price}`, res[5].units],
      [res[6].item_id, res[6].product_name, `$${res[6].price}`, res[6].units],
      [res[7].item_id, res[7].product_name, `$${res[7].price}`, res[7].units],
      [res[8].item_id, res[8].product_name, `$${res[8].price}`, res[8].units],
      [res[9].item_id, res[9].product_name, `$${res[9].price}`, res[9].units]
    );

    console.log(table.toString());

    prompt1();
  });
}

function prompt1() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "select an option",
        choices: ["buy", "sell"],
        name: "prompt1"
      }
    ])
    .then(function(response1) {
      switch (response1.prompt1) {
        case "buy":
          buySomething();
          break;
      }
    });
}

function buySomething() {
  inquirer
    .prompt([
      {
        message: `enter id of product you want to buy (${chalk.red(
          "must be a number!"
        )})`,
        name: "productID"
      },
      {
        message: `how many units do you want to buy? (${chalk.red(
          "must be a number!"
        )})`,
        name: "units"
      }
    ])
    .then(function(buyResponse) {
      console.log(buyResponse.productID, buyResponse.units);
      queryDB(buyResponse.productID, buyResponse.units);
    });
}

var queryDB = function(productID, units) {
  let preCommand = `SELECT * From PRODUCTS`;
  var units = units;
  console.log(units);

  function matchID() {
    connection.query(preCommand, function(err, res) {
      if (err) throw err;
      console.log("RES: ", res);
      console.log("ID WITHIN LOOP: ", productID);
      //console.log(res[4].item_id);
      for (i = 0; i < res.length; i++) {
        if (res[i].item_id == productID) {
          var totalUnits = res[i].units;
          console.log("units in DB: ", totalUnits);
          //tableRes is the item_id right now...
          //units is the number of units the user wants to buy
          //we need to find the number of units total before the user buys it
        }
      }
      addToDB(productID, units, totalUnits);
    });
  }
  matchID();
};

var addToDB = function(id, purchasedUnits, totalUnits) {
  //console.log(tableRes.units, purchasedUnits);
  console.log("addtoDB: ", totalUnits);
  var newUnits = +totalUnits - +purchasedUnits;
  console.log("new units:", newUnits);
  command = `UPDATE products SET units = ${newUnits} WHERE item_id = ${id}`;
  connection.query(command, function(err, res) {
    if (err) throw err;
    console.log("units remaining: ", res);
    console.log("Congrats! you just bought stuff!");
  });
};
