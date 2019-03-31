DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products(
item_id INT(11) NOT NULL auto_increment,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price)
VALUES("10 Gallons of Sour Patch Kids","Food",100),
("DSLR Full of Photos of Obama", "Electronics",900),
("Hiking Boots","Outdoors",80),
("Haunted Turntable","Music",200),
("Snuggie: the blanket with sleeves","Clothing",20),
("Video Doorbell and Fake Amazon Package","Electronics",179.99),
("Deed to Mount Everest","Outdoors",9999.99),
("Elon Musk's PC (NOT FAKE)","Electronics",5.19),
("Fedora with hot-rod flames","Clothing",19.99),
("Lil Embezzler's First Money Laundering Playset","Toys",199);

SELECT * FROM products