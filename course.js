const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema([
  {
    title: String,
    description: String,
    fees: Number,
  },
]);

const CourseModel = mongoose.model("course", courseSchema);
module.exports = CourseModel;
