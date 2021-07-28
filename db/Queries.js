const connection = require("../index.js");

class DB {
    constructor(connection) {this.connection = connection;}


allDepartments (){
    return this.connection.query("SELECT * FROM department ")
}

allEmployees (){
    return this.connection.query("SELECT * FROM employee ")
}

allRoles (){
    return this.connection.query("SELECT * FROM roles ")
}
}