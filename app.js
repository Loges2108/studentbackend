const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const StudentModel = require("./student");
const CourseModel = require("./course");
const app = express();

const PORT = 3200;

mongoose
  .connect("mongodb+srv://thangamlogeswaran21:Loges2108@cluster0.jgqqzge.mongodb.net/test")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));


app.use(cors());
app.use(express.json());




//course details

app.post("/createcourse", async (req, res) => {
  const courses = await CourseModel.create({
    title: req.body.title,
    description: req.body.description,
    fees: req.body.fees,
  });
  res.json(courses);
});

app.get("/getcourses", async (req, res) => {
  try {
    const courses = await CourseModel.find(req.params.id, {
      title: 1,
      description: 1,
      fees: 1,
      _id: 1 ,
    });
    res.json(courses);
  } catch (err) {
    res.status(404).json({
      status:"fail",
      message:err.messsage
    })
  }
});

app.get("/getcourseByid/:id", async (req, res) => {
  const courses = await CourseModel.findById(req.params.id, {
    title: 1,
    description: 1,
    fees: 1,
    _id: 0,
  });
  res.json(courses);
});

app.put("/updatecourse/:id", async (req, res, next) => {
  try {
    var existcourse = await CourseModel.findById(req.params.id);
    if (!existcourse) {
      throw new Error("course not found");
    }
    var updatecourse = {
      title: req.body.title,
      description: req.body.description,
      fees: req.body.fees,
    };
    await CourseModel.findByIdAndUpdate(req.params.id, updatecourse);
    res.json(updatecourse);
  } catch (error) {
    next(error);
  }
});

app.delete("/deletecoursebyid/:id", async (req, res, next) => {
  try {
    var result = await CourseModel.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});


// student details


app.post("/createstudents", async (req, res) => {
  const students = await StudentModel.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    courses: req.body.courses,
  });
  res.json(students);
});

app.delete("/deletestudentbyid/:id", async (req, res) => {
  try {
    var result = await StudentModel.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

app.put("/updatestudent/:id", async (req, res, next) => {
  try {
    var existstudent = await StudentModel.findById(req.params.id);
    if (!existstudent) {
      throw new Error("student not found");
    }
    var updatestudent = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      courses: req.body.courses,
    };
    await StudentModel.findByIdAndUpdate(req.params.id, updatestudent);
    res.json(updatestudent);
  } catch (error) {
    next(error);
  }
});

app.get("/getstudentbyid/:id",async(req,res,next)  => {
    try {
        const student = await StudentModel.findById(req.params.id, {
            name: 1,
            courses:1,
            age: 1,
            _id: 0,
          }).populate({ path: 'courses', select:["title","description","fees"]});
          res.json(student);
    } catch (error) {
      next(error)  
    }
})

app.get("/getstudents",async(req,res,next)  => {
  try {
      const students = await StudentModel.find(req.params.id, {
          name: 1,
          age:1,
          email:1,
          phoneNumber:1,
          gender:1,
          _id: 1,
          courses:1
        })  

        res.json(students);
  } catch (error) {
    next(error)  
  }
})
app.get("/getstudentbyfees",async(req,res,next)  => {
    try {
        const student = await StudentModel.find(req.params.id,{
            name:1,
            age:1,
            email:1,
            gender:1,
            phoneNumber:1,
            courses:1,
            _id:0
        }
            
        ).populate({ path: 'courses', match: { fees: { $gte: 40000 }} })
        
          res.json(student);
    } catch (error) {
      next(error)  
    }
})

app.listen(PORT, (error) => {
  if (!error) {
    console.log("server is running successfully");
  } else console.log("error occured", error);
});
