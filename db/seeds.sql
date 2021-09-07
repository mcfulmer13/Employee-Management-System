use employees;

INSERT INTO department (name)
VALUES
    ('HR'),
    ('Engineering'),
    ('Accounting'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('HR manager', 130000, 1001),
    ('HR  generalist', 50000, 1001),
    ('jr Engineer', 105000, 1002),
    ('sr accountant', 175000, 1003),
    ('Accountant 1', 100000, 1003),
    ('Lead Counsel', 300000, 1004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'ceina', 1, NULL),
    ('Morty', 'Smith', 2, 1),
    ('Rick', 'Sanchez', 3, NULL),
    ('Beth', 'Smith', 4, 2),
    ('Jerry', 'Smith', 5, 3),
    ('Paul', 'Walker', 6, Null);
    