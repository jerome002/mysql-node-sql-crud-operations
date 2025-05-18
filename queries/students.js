const db = require('../db');

module.exports = {
  getAllStudents: (callback) => {
    db.query('SELECT * FROM students', callback);
  },
  addStudent: (student, callback) => {
    const sql = 'INSERT INTO students (first_name, last_name, date_of_birth, grade_level) VALUES (?, ?, ?, ?)';
    db.query(sql, [student.first_name, student.last_name, student.date_of_birth, student.grade_level], callback);
  },
  updateStudent: (id, student, callback) => {
    const sql = 'UPDATE students SET first_name = ?, last_name = ?, date_of_birth = ?, grade_level = ? WHERE student_id = ?';
    db.query(sql, [student.first_name, student.last_name, student.date_of_birth, student.grade_level, id], callback);
  },
  deleteStudent: (id, callback) => {
    const sql = 'DELETE FROM students WHERE student_id = ?';
    db.query(sql, [id], callback);
  }
};
