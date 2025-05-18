const db = require('../db');

module.exports = {
  getAllEnrollments: (callback) => {
    db.query('SELECT * FROM enrollments', callback);
  },
  addEnrollment: (enrollment, callback) => {
    const sql = 'INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, ?)';
    db.query(sql, [enrollment.student_id, enrollment.course_id, enrollment.enrollment_date], callback);
  },
  updateEnrollment: (id, enrollment, callback) => {
    const sql = 'UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ? WHERE enrollment_id = ?';
    db.query(sql, [enrollment.student_id, enrollment.course_id, enrollment.enrollment_date, id], callback);
  },
  deleteEnrollment: (id, callback) => {
    const sql = 'DELETE FROM enrollments WHERE enrollment_id = ?';
    db.query(sql, [id], callback);
  }
};