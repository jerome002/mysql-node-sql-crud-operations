const students = require('./queries/students');
const courses = require('./queries/courses');
const enrollments = require('./queries/enrollments');
const { enrollStudentIfCourseExistsOrInsertIt } = require('./queries/enrollmentHelper');


// Sample usage
// Adding multiple students
const newStudents = [
  { first_name: 'Jerome', last_name: 'Kapkor', date_of_birth: '2000-01-01', grade_level: 10 },
  { first_name: 'Jane', last_name: 'Wairimu', date_of_birth: '2001-02-02', grade_level: 11 },
  { first_name: 'Alice', last_name: 'Rotich', date_of_birth: '2002-03-03', grade_level: 12 },
  { first_name: 'Bob', last_name: 'Mwangi', date_of_birth: '2003-04-04', grade_level: 9 },
  { first_name: 'Charlie', last_name: 'Njeri', date_of_birth: '2004-05-05', grade_level: 8 },

];
newStudents.forEach(student => {
  students.addStudent(student, (err, result) => {
    if (err) console.error('Error adding student:', err);
    else console.log('Student added:', result);
  });
});

// Students
students.getAllStudents((err, results) => {
  if (err) console.error('Error fetching students:', err);
  else console.log('Students:', results);
});

// Adding multiple courses
const newCourses = [
  { course_name: 'Mathematics', instructor: 'Dr. Smith' },
  { course_name: 'Science', instructor:'Prof. Johnson' },
  { course_name: 'History',  instructor:'Ms. Davis' },
  { course_name: 'Geography',instructor: 'Mr. Brown' },
  { course_name: 'English',  instructor:'Mrs. Wilson' },
];
newCourses.forEach(course => {
  courses.addCourse(course, (err, result) => {
    if (err) console.error('Error adding course:', err);
    else console.log('Course added:', result);
  });
});
// Courses
courses.getAllCourses((err, results) => {
  if (err) console.error('Error fetching courses:', err);
  else console.log('Courses:', results);
});

// Adding multiple enrollments
const newEnrollments = [
  { student_id: 1, course_id: 1, enrollment_date: '2023-09-01' },
  { student_id: 2, course_id: 2, enrollment_date: '2023-09-02' },
  { student_id: 3, course_id: 3, enrollment_date: '2023-09-03' },
  { student_id: 4, course_id: 4, enrollment_date: '2023-09-04' },
  { student_id: 5, course_id: 5, enrollment_date: '2023-09-05' },
];
function enrollStudent(studentId, courseId, enrollmentDate) {
  if (!studentId || !courseId || !enrollmentDate) {
    console.error('Enrollment Error: Missing required fields: studentId, courseId, or enrollmentDate.');
    return;
  }

  const query = `INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, ?)`;
  connection.query(query, [studentId, courseId, enrollmentDate], (err, results) => {
    if (err) {
      console.error('Enrollment Error:', err);
    } else {
      console.log('Student enrolled successfully!');
    }
  });
}


