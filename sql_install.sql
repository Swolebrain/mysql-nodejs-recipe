CREATE TABLE sections(
section_id VARCHAR(16) KEY NOT NULL,
teacher_name VARCHAR(64) NOT NULL,
course_name VARCHAR(64) NOT NULL,
grade VARCHAR(2) NOT NULL);

CREATE TABLE transactions(
id int(10) unsigned KEY AUTO_INCREMENT,
sid char(5) NOT NULL,
donation float NOT NULL);

CREATE TABLE students (
sid CHAR(5) KEY NOT NULL,
fname VARCHAR(32) NOT NULL,
lname VARCHAR(32) NOT NULL,
mname CHAR(1),
section_id VARCHAR(16) NOT NULL);

LOAD DATA INFILE 'C:/Users/Victor/Documents/GitHub/mysql-nodejs-recipe/sections.csv' 
INTO TABLE sections FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\r\n' IGNORE 1 LINES;

LOAD DATA INFILE 'C:/Users/Victor/Documents/GitHub/mysql-nodejs-recipe/studentTable.csv' 
INTO TABLE students FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\r\n' IGNORE 1 LINES;
