INSERT INTO department (name)
VALUES ('sales'), ('engineering'), ('HR');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Back End Developer', 60000, 2),
    ('Front End Developer', 60000, 2),
    ('Human Resources', 55000, 3),
    ('Salesperson', 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Tia', 'Tamera', 2, NULL),
    ('Bob', 'Duncan', 3, NULL),
    ('Mike', 'Wazowski', 3, 2),
    ('Aaliyah', 'Smith', 4, NULL),
    ('Tonya', 'Johnson', 4, 4);