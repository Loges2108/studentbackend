const mongoose = require("mongoose");
const CourseModel = require("./course");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email:String,
  phoneNumber:Number,
  gender:String,
  courses:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }
  ]
  
});

const StudentModel = mongoose.model("student", studentSchema);
module.exports = StudentModel;