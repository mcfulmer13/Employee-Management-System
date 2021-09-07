const connection = require("./connection");

class DB {

  constructor(connection) {this.connection = connection;}

  displayEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  displayRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  displayDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department;"
    );
  }

  newEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  newRole(role) {
    console.log(role);
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  
  createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  rmvEmployee(employeeId) {
    return this.connection.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  updateRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

}

module.exports = new DB(connection);