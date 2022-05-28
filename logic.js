const db = require('./db/connection');
const inquirer = require('inquirer');

const deptArr = [];
const roleArr = [];
const employeeArr = [];

class Queries {

    viewAllDepartments() {
        const sql = `SELECT * FROM department`;
        
        db.query(sql, (err,rows) => {
            if (err) {
                console.log('error:', err.message);
                return;
            }
            console.table(rows);
        });
    }

    viewAllRoles() {
        const sql = `SELECT * FROM role`;

        db.query(sql, (err,rows) => {
            if (err) {
                console.log('error:', err.message);
                return;
            }
            console.table(rows);
        });
    }

    viewAllEmployees() {
        const sql = `SELECT * FROM employee`;

        db.query(sql, (err,rows) => {
            if (err) {
                console.log('error:', err.message);
                return;
            }
            console.table(rows);
        });
    }

    addADepartment() {
        const createNewDepartment = (department_name => {
                    const sql = `INSERT INTO department (name) VALUES ('${department_name}')`;

                    db.query(sql, (err, result) => {
                        if (err) {
                                console.log('error:', err.message);
                                return;
                        }
                        console.log(`\nDepartment created succesfully!`);
                           
                        console.table(this.viewAllDepartments());
                    });
                })

        return inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?',
                validate: depNameInput => {
                    if (!depNameInput) {
                        return false;
                    }
                    return true;
                }
            }
        ]).then(input => {
            const deptName = input.department_name;
            createNewDepartment(deptName);
        });

        
        
    }

    getAllDeptOpts() {
        db.query(`SELECT * FROM department`, (err, rows) => {
            if (err) {
                console.log('error:', err.message);
            }
            rows.forEach(row => {
                let deptObj = {
                    name: row.name,
                    deptID: row.id
                }
                deptArr.push(deptObj);
            })
        })
    }

    addARole() {
       const createNewRole = (role_title, salary_amt, departmentId) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${role_title}', ${salary_amt}, ${departmentId})`;

            db.query(sql, (err, result) => {
                if (err) {
                    console.log('error:', err.message);
                    return;
                }
                console.log(`\nRole added successfully!`);
                console.table(result);
            });
        }

        this.getAllDeptOpts();

        return inquirer.prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'What is the title of the role?',
                validate: roleTitleInput => {
                    if (!roleTitleInput) {
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'salary_amt',
                message: 'What is the salary amount?',
                validate: salaryAmtInput => {
                    if (!salaryAmtInput) {
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department does this role fall under?',
                choices: deptArr,
                validate: depIdInput => {
                    if (!depIdInput) {
                        return false;
                    }
                    return true;
                }
            }
        ]).then(input => {
            console.log(input);
            const role_title = input.role_title;
            const salary_amt = input.salary_amt;
            const departmentId = input.departmentId;
            console.log(departmentId);
            createNewRole(role_title, salary_amt, departmentId);

        
        })
    }

    addAnEmployee(firstName, lastName, roleId, managerId) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log('error:', err.message);
                return;
            }
            console.log('Employee added successfully!');
            console.table(result);
        });
    }

    updateEmployeeRole(updatedRoleId, employeeId) {
        const sql = `UPDATE employee SET role_id = ${updatedRoleId} WHERE id = ${employeeId}`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log('error:', err.message);
                return;
            }
            console.log("Successfully updated employee's role!");
            console.table(result);
        });
    }

    initMenu() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'choicesPrompt',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    "Update an employee's role"
                ]
            }
        ]).then(userSelection => {
            
            if (userSelection.choicesPrompt === 'View all departments') {
                this.viewAllDepartments();

                this.initMenu();
            } else if (userSelection.choicesPrompt === 'View all roles') {
                this.viewAllRoles();

                this.initMenu();
            } else if (userSelection.choicesPrompt === 'View all employees') {
                this.viewAllEmployees();

                this.initMenu();
            } else if (userSelection.choicesPrompt === 'Add a department') {
                return this.addADepartment().then(() => {
                    return this.initMenu();
                })
            } else if (userSelection.choicesPrompt === 'Add a role') {
                this.addARole().then(() => {
                    this.initMenu();
                })
            }
        })
    }
}

new Queries().initMenu();