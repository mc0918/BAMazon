require("dotenv").config();

console.log("this is loaded");

//store password
exports.password = {
  id: process.env.PASSWORD,
  managerID: process.env.MANAGER_PASSWORD
};
