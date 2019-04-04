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
var managerPass = pass.password.managerID;

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
  inquirer
    .prompt([
      {
        type: "list",
        message: "Login here",
        choices: [chalk.bgWhite.bold.blue("User login"), "Manager login"],
        name: "initial"
      }
    ])
    .then(function(firstResponse) {
      if (firstResponse.initial === "Manager login") {
        managerLogin();
      } else {
        login();
      }
    });
});

console.log("database loaded!");

//===================Functions to be called======================
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
        choices: ["buy", "quit"],
        name: "prompt1"
      }
    ])
    .then(function(response1) {
      switch (response1.prompt1) {
        case "buy":
          buySomething();
          break;
        case "quit":
          console.log("see ya later, alligator");
          connection.end();
          break;
        default:
          console.log("how and why are you seeing this?");
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

//Takes the item id and number of units the user wants to buy and stores them
//also generates a command for SQL to select the whole products table
var queryDB = function(productID, units) {
  let preCommand = `SELECT * From PRODUCTS`;
  var units = units;
  console.log(units);

  //Queries products to find the id of item being bought
  //Also saves item id and units bought passed down from queryDB function
  function matchID() {
    connection.query(preCommand, function(err, res) {
      if (err) throw err;
      console.log("RES: ", res);
      console.log("ID WITHIN LOOP: ", productID);
      for (i = 0; i < res.length; i++) {
        if (res[i].item_id == productID) {
          var totalUnits = res[i].units;
          console.log("units in DB: ", totalUnits);
        }
      }
      //Uses item id, total units, and units bought by user. All passed down by parent functions
      addToDB(productID, units, totalUnits);
    });
  }
  matchID();
};

//Updates database to reflect units bought and prints an error if not enough units are available to purchase
var addToDB = function(id, purchasedUnits, totalUnits) {
  console.log("addtoDB: ", totalUnits);
  var newUnits = +totalUnits - +purchasedUnits;
  if (newUnits < 0) {
    console.log(
      "Insufficient units! Buy Less! I know, can you believe that in 2019 we're telling you to buy less? Capitalism really has altered our worldviews, huh?"
    );
    prompt1();
  } else {
    console.log("new units:", newUnits);
    command = `UPDATE products SET units = ${newUnits} WHERE item_id = ${id}`;
    connection.query(command, function(err, res) {
      if (err) throw err;
      console.log("units remaining: ", res);
      console.log("Congrats! you just bought stuff!");
      prompt1();
    });
  }
};

//=======I don't need to make a new node application if I use .env============
var managerLogin = function() {
  inquirer
    .prompt([
      {
        message: "Enter manager password",
        name: "password"
      }
    ])
    .then(function(managerLogin) {
      if (managerLogin.password === managerPass) {
        console.log("groovy times cool diver");
        managerPrompt();
      }
    });
};

var managerPrompt = function() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        choices: [
          "View products for sale",
          "View low inventory",
          "Add to inventory",
          "Add new product",
          "Logout"
        ],
        name: "manager"
      }
    ])
    .then(function(response) {
      switch (response.manager) {
        case "View products for sale":
          console.log("ok!");
          let command = `SELECT * FROM products`;
          connection.query(command, function(err, res) {
            if (err) throw err;
            //Table will load here, displaying all info
          });
          managerPrompt();
          break;
        case "View low inventory":
          console.log("ok!");
          //SQL command will be something like SELECT * FROM products WHERE units < 5.
          break;
        case "Add to inventory":
          console.log("ok!");
          //Inquirer prompt asking what to add to and how many units
          //Inquirer will pass down user input and a new function will use them to build a command to change the database
          break;
        case "Add new product":
          console.log("ok!");
          //Similar to above, inquirer prompt asking for the required parameters (name, department, units)
          //Then SQL command to add the new product to the database
          break;
        case "Logout":
          console.log("Get back to work!");
          connection.end();
          break;
      }
    });
};
