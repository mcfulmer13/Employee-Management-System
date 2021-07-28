DROP DATABASE IF EXISTS orgstructure_db;

CREATE DATABASE orgstructure_db;

USE orgstructure_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
  
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    role_title VARCHAR(30) NULL,
    role_salary DECIMAL(30) NULL,
    department_id INIT NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fitst_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INIT NULL,
    manager_id INIT NULL
);
