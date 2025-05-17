//connect to a mysql database using mysql2
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'schooldb'
});
//connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
//show all the tables in the database
connection.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('Error fetching tables:', err);
        return;
    }
    console.log('Tables in the database:', results);
});
//show all the columns in the students table
connection.query('SHOW COLUMNS FROM students', (err, results) => {
    if (err) {
        console.error('Error fetching columns:', err);
        return;
    }
    console.log('Columns in the students table:', results);
});
//insert a multiple students into the students table by using the object notation
const students = [
    { first_name: 'John', last_name: 'kapkor', date_of_birth: '2000-02-12', grade_level: 9 },
    { first_name: 'Jane', last_name: 'doe', date_of_birth: '2001-03-15', grade_level: 10 },
    { first_name: 'Jim', last_name: 'beam', date_of_birth: '2002-04-20', grade_level: 11 },
    { first_name: 'Jack', last_name: 'daniels', date_of_birth: '2003-05-25', grade_level: 12 }
];
// Insert multiple students into the students table
const sql = 'INSERT INTO students (first_name, last_name, date_of_birth, grade_level) VALUES ?';
const values = students.map(student => [student.first_name, student.last_name, student.date_of_birth, student.grade_level]);
connection.query(sql, [values], (err, results) => {
    if (err) {
        console.error('Error inserting students:', err);
        return;
    }
    console.log('Inserted students:', results);
});
//print all the students in the students table
connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
        console.error('Error fetching students:', err);
        return;
    }
    console.log('Students in the table:', results);
});
//update a student in the students table
const studentId = 1; // ID of the student to update
const updatedStudent = { first_name: 'John', last_name: 'doe', date_of_birth: '2000-02-12', grade_level: 10 };
const updateSql = 'UPDATE students SET first_name = ?, last_name = ?, date_of_birth = ?, grade_level = ? WHERE student_id = ?';
connection.query(updateSql, [updatedStudent.first_name, updatedStudent.last_name, updatedStudent.date_of_birth, updatedStudent.grade_level, studentId], (err, results) => {
    if (err) {
        console.error('Error updating student:', err);
        return;
    }
    console.log('Updated student:', results);
}); 
//delete a student in the students table
const deleteStudentId = 2; // ID of the student to delete
const deleteSql = 'DELETE FROM students WHERE student_id = ?';
connection.query(deleteSql, [deleteStudentId], (err, results) => {
    if (err) {
        console.error('Error deleting student:', err);
        return;
    }
    console.log('Deleted student:', results);
});
//show all the students in the students table
connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
        console.error('Error fetching students:', err);
        return;
    }
    console.log('Students in the table:', results);
});
//close the connection
connection.end((err) => {
    if (err) {
        console.error('Error closing the connection:', err);
        return;
    }
    console.log('Connection closed');
});

