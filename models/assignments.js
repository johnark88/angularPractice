var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  student_name: String,
  assignment_number: Number,
  score: Number,
  date_completed: Date
});

// users is the name of the collection in the database
// WARNING will lowercase and pluralize collection name
var Student = mongoose.model('students', studentSchema);

module.exports = Student;
