const inquirer = require("inquirer");
const db = require("./db/queries.js");
require("console.table");

init = () => {teamGen();}

function teamGen() {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Make a Selection to View or Manage The Employee Database",
      choices: [
        {
          name: "View All Employees",
          value: "viewEMPLOYEES"
        },
        {
          name: "View All Roles",
          value: "viewROLES"
        },
        {
          name: "View All Departments",
          value: "viewDEPARTMENTS"
        },
        {
          name: "Add an Employee",
          value: "addEMPLOYEE"
        },
        {
          name: "Add a Role",
          value: "addROLE"
        },
        {
          name: "Add Department",
          value: "addDEPARTMENT"
        },
        {
          name: "Remove an Employee",
          value: "rmvEMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "updateROLE"
        },
        {
          name: "exit",
          value: "exit"
        }
      ]
    }
  ]).then(res => { let choice = res.choice;
    switch (choice) {
      case "viewEMPLOYEES": allEmployees();
        break;
      case "viewROLES": allroles();
        break;  
      case "viewDEPARTMENTS": allDepartments();
        break;  
      case "addEMPLOYEE": addEmployee();
        break;
      case "addROLE": addRole();
        break;  
      case "addDEPARTMENT": addDepartment();
        break;
      case "rmvEMPLOYEE": rmvEmployee();
        break;
      case "updateROLE": updateRole();
        break;
      
      default:
        exit();
    }
  })
}

function exit() {
  console.log("End Employee Managment - run node index.js to begin a new employee managment session");
  process.exit();
}

function allEmployees() { db.displayEmployees()
    .then(([rows]) => { let employees = rows;
      console.log("\n");
      console.table(employees);
      teamGen();
    })}

function allroles() { db.displayRoles()
    .then(([rows]) => { let roles = rows;
      console.log("\n");
      console.table(roles);
      teamGen();
    })}

function allDepartments() { db.displayDepartments()
    .then(([rows]) => { let departments = rows;
      console.log("\n");
      console.table(departments);
      teamGen();
    })}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter Employee First Name"
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter Employee Last Name"
    }
  ])
    .then(res => { let firstName = res.first_name; let lastName = res.last_name;
      db.displayRoles()
        .then(([rows]) => { let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title, value: id
          }));

          inquirer.prompt({
            type: "list",
            name: "roleId",
            message: "Select Employee Role",
            choices: roleChoices
          })
            .then(res => { let roleId = res.roleId;
              db.displayEmployees()
                .then(([rows]) => { let employees = rows;
                  const managerChoices = employees.map(({ first_name, last_name, id }) => 
                  ({ name: `${first_name} ${last_name}`, value: id}));
                  inquirer.prompt({
                    type: "list",
                    name: "managerId",
                    message: "Select Employee Manager",
                    choices: managerChoices
                  })
                    .then(res => { let employee = 
                      { manager_id: res.managerId, role_id: roleId, first_name: firstName, last_name: lastName }
                      db.newEmployee(employee);
                    })
                    .then(() => console.log(`Added New Employee to the database`))
                    teamGen();
                })
            })
        })
    })
}

function addRole() {
  db.displayDepartments()
    .then(([rows]) => { let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => 
      ({
        name: name,
        value: id
      }));
      console.log(departmentChoices);
      inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter Role Title"
        },
        {
          type: "input",
          name: "salary",
          message: "Enter Role Salary"
        },
        {
          type: "list",
          name: "department_id",
          message: "Select Employee Department",
          choices: departmentChoices
        }
      ])
        .then(role => {
          console.log(role);
          db.newRole(role)
          .then(() => console.log("A New  Role Has Been Added To The Database"))
          teamGen();
        })
    })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Department Name"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log("A New Department Has Been Added to The Database"))
        teamGen();
    })
}

function rmvEmployee() {
  db.displayEmployees()
    .then(([rows]) => { let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => 
      ({ name: `${first_name} ${last_name}`, value: id }));
      inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select Employee To Be Removed",
          choices: employeeChoices
        }
      ])
        .then(res => db.rmvEmployee(res.employeeId))
        .then(() => console.log("Employee Has Been Removed"))
        teamGen();
    })
}

function updateRole() {
  db.displayEmployees()
    .then(([rows]) => { let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`, value: id}));
        inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select Employee Role To Be Updated",
          choices: employeeChoices
        }
      ])
        .then(res => { let employeeId = res.employeeId;
          db.displayRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => 
              ({
                name: title,
                value: id
              }));

              inquirer.prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Select New Employee Role",
                  choices: roleChoices
                }
              ])
                .then(res => db.updateRole(employeeId, res.roleId))
                .then(() => console.log("Updated employee's role"))
                teamGen();
            });
        });
    })
}


init();
