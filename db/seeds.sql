USE orgstructure_db;


INSERT INTO department (id, department_name)
VALUES (01, "ACCOUNTING"),
       (02, "LEGAL"),
       (03, "Engineering"),
       (04, "HR");
       
INSERT INTO roles (id, role_title, role_salary, department_id)
VALUES (01, "ACCOUNTANT", "70000", 01),
       (02, "SENIOR ACCOUNTANT", "120000", 01)
       (03, "LEAGAL TEAM MEMBER", "170000", 02 ),
       (04, "LEAD ENGINEER", "100000", 03),
       (05, "HR GENERALIST", "72000", 04);

INSERT INTO role (id, first_name, last_name, role_id, manager_id)
VALUES (01, "John", "Cena", 02, 01),
       (02, "Morty", "Smith", 01, 01)
       (03, "Beth", "Smith",  03, 01 ),
       (04, "Rick", "Sanchez", 04, 01),
       (05, "Jerry", "Smith", 05, 01);       
       
