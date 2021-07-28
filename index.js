const inquirer = require('inquirer')
const mysql = require('mysql2');
const org_db = require('./db/Queries.js')

const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'orgstructure_db'
    },
    console.log(`Connected to the orgstructure_db database.`)
  );
  
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'PLEASE MAKE A SELECTION',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role' ] 
    },
    
  ]) .then((answers) => {
    if (answers.choice === "view all departments"){
        allDepartments();
    } else if (answers.choice === "view all roles"){
        allRoles();
    } else if (answers.choice === "view all employees"){
        allEmployees();
    }});

    module.exports = connection;