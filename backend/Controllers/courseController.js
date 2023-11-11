const courseModel = require("../Models/courseModel");
const CourseModel = require("../Models/courseModel");
const Validation = require("./validator");

// *************** Create Course API ***************
const createCourse = async function (req, res) {
  try {
    let course = req.body;
    if (!Validation.isValidBody(course)) {
      return res.status(404).send({ status: false, msg: "No Data Provided" });
    }
    let { title, description, duration, instructor, price } = course;

    // Name Validation
    if (!Validation.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter The title of Course" });
    }

    // Description Validation
    if (!Validation.isValid(description)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Course Description" });
    }

    // Duration Validation
    if (!Validation.isValid(duration)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Course Duration" });
    }

    // Instructor Validation
    if (!Validation.isValid(instructor)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter The Name of Instructor" });
    }

    // Price Validation
    if (!Validation.isValid(price)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Price of the Course" });
    }

    let duplicateCourse = await CourseModel.findOne({
      title,
      description,
      duration,
      instructor,
      price,
    });
    if (duplicateCourse) {
      return res
        .status(400)
        .send({ status: false, msg: "This Course Already Exists" });
    }

    let courseCreate = await CourseModel.create(course);
    return res.status(201).send({
      status: true,
      msg: "Course Created Successfully",
      data: courseCreate,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

// *************** Get Course API ***************
const getCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find();
    return res.status(200).send({
      status: true,
      msg: "Courses retrieved successfully",
      data: courses,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

// *************** Update Course API ***************

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourseData = req.body;
    let {title, description, instructor, duration, price} = updatedCourseData
    // let { title, description, instructor, duration, price } = updatedCourseData;
    // Validation checks...
    if (!Validation.isValidBody(updatedCourseData)) {
      return res.status(400).send({
        status: false,
        msg: "Invalid data provided for updating the course",
      });
    }
    if (!Validation.isValid(title || description || instructor || duration || price) )
      return res
        .status(404)
        .send({ status: false, msg: "Please provide appropriate details" });
    
    let dupcourse = await courseModel.findOne({
      title,
      description,
      duration,
      instructor,
      price,
    });
    if (dupcourse)
      return res
        .status(400)
        .send({ status: false, msg: "This Course Already exists!!" });

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).send({ status: false, msg: "Course not found" });
    }

    return res.status(200).send({
      status: true,
      msg: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

// *************** Delete Course API ***************

let deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Validation checks...
    if (!Validation.isValidObjectId.test(courseId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Invalid course ID provided" });
    }

    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).send({ status: false, msg: "Course not found" });
    }

    return res.status(200).send({
      status: true,
      msg: "Course deleted successfully",
      // data: deletedCourse,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

module.exports = { createCourse, getCourse, updateCourse, deleteCourse };
