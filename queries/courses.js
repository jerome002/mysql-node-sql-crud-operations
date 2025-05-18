const db = require('../db');

module.exports = {
  getAllCourses: (callback) => {
    db.query('SELECT * FROM courses', callback);
  },
  addCourse: (course, callback) => {
    const sql = 'INSERT INTO courses (course_name, instructor) VALUES (?, ?)';
    db.query(sql, [course.course_name, course.instructor], callback);
  },
  updateCourse: (id, course, callback) => {
    const sql = 'UPDATE courses SET course_name = ?, instructor = ? WHERE course_id = ?';
    db.query(sql, [course.course_name, course.instructor, course_id], callback);
  },
  deleteCourse: (course_id, callback) => {
    const sql = 'DELETE FROM courses WHERE course_id = ?';
    db.query(sql, [course_id], callback);
  }
};
