# Welcome to BAMazon

## An Amazon-like storefront using MySQL and Node.js

###This application requires the following:###

- A knowledge of mySQL, CLI, and setting up a .env file for your passwords
  - If you're comfortable doing all this through Node.js, continue onwards!

## 1. Setup

- Navigate to the directory containing bamazon.js in your command line and run the command: \$ node bamazon.js
  ![initialize](...)

##2. Login ##

- After running the file, you will be prompted to select either the manager or user login. Manager login requires creating "MANAGER_PASSWORD=" in your .env file and entering it when prompted to login. User login requires no password.
  ![managerLoginPrompt](...)

##3. Interacting with the Database##

- Select User Login to interact with the database as the manager options have only been pseudo-coded so far.
- Selecting User Login will print a welcome message and the current inventory of items. A prompt will appear asking whether you want to buy or quit.
- quit will end the program. Buy will let you pseudo-purchase items from the database.
  ![BamazonStartScreen](...)

##4. Buy ##

- Select the "buy" option. You will be prompted to enter the id (shown in the table) of the item you'd like to buy. Then, enter the number of units you'd like to buy. If you want to buy more units than are available you will see an error message.
  ![buyId](...)
  ![unitErrorMessage](...)

If you entered an acceptable number of units, you will have successfully purchased your first Bamazon purchase! Buy more if you want! A JSON object will appear in the console, confirming your purchase and how the database has been altered to reflect the units purchased.
![successScreen](...)
