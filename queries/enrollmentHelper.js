const mysql = require('mysql2/promise');

// Setup the database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'schooldb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Enroll a student in a course (insert course if it doesn't exist).
 * Prevents duplicate enrollments and ensures atomic operations.
 */
async function enrollStudentIfCourseExistsOrInsertIt(studentId, courseId, enrollmentDate, courseName = "Untitled Course", credits = 3) {
  const connection = await pool.getConnection();
  try {
    // Validate inputs
    if (!studentId || !courseId || !enrollmentDate) {
      throw new Error("Missing required fields: studentId, courseId, or enrollmentDate.");
    }

    await connection.beginTransaction();

    // Check if the course exists
    const [courseRows] = await connection.execute(
      'SELECT * FROM courses WHERE course_id = ?',
      [courseId]
    );

    if (courseRows.length === 0) {
      console.log(`Course ID ${courseId} not found. Inserting new course.`);
      await connection.execute(
        'INSERT INTO courses (course_id, course_name, credits) VALUES (?, ?, ?)',
        [courseId, courseName, credits]
      );
    }

    // Check if the student is already enrolled in the course
    const [existingEnrollment] = await connection.execute(
      'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?',
      [studentId, courseId]
    );

    if (existingEnrollment.length > 0) {
      await connection.rollback();
      return {
        success: false,
        message: `Student ${studentId} is already enrolled in course ${courseId}.`
      };
    }

    // Insert enrollment record
    await connection.execute(
      'INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, ?)',
      [studentId, courseId, enrollmentDate]
    );

    await connection.commit();
    return {
      success: true,
      message: `Student ${studentId} enrolled in course ${courseId} on ${enrollmentDate}.`
    };
  } catch (err) {
    await connection.rollback();
    console.error('Enrollment Error:', err.message);
    return {
      success: false,
      message: `Enrollment failed: ${err.message}`
    };
  } finally {
    connection.release();
  }
}

// Export the helper
module.exports = {
  enrollStudentIfCourseExistsOrInsertIt
};
