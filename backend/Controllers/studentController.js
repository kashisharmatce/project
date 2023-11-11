const StudentModel = require("../Models/studentModel.js");
const validation = require("./validator.js");
let jwt = require("jsonwebtoken");

// Register Student
let createStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!validation.isValidBody(data)) {
      return res.status(400).send({ status: false, msg: "No Data Provided" });
    }
    let { Name, Gender, Email, Mobile, Password } = data;

    // Name Validation
    if (!validation.isValid(Name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Name" });
    }

    if (!validation.isValidName.test(Name)) {
      return res.status(400).send({ msg: "Name Should be Valid" });
    }

    // Gender Validation
    if (!validation.isValid(Gender)) {
      return res.status(400).send({ status: false, msg: "Gender is Required" });
    }

    // Email Validation
    if (!validation.isValid(Email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Email" });
    }

    if (!validation.isValidEmail.test(Email)) {
      return res.status(400).send({ msg: "Invalid Email" });
    }

    let dupEmail = await StudentModel.findOne({ Email });
    if (dupEmail) {
      return res.status(400).send({ msg: "Email Already Exists" });
    }

    // Mobile Validation
    if (!validation.isValid(Mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Mobile Number" });
    }

    let dupMob = await StudentModel.findOne({ Mobile });
    if (dupMob) {
      return res.status(400).send({ msg: "Mobile Number Already Registered" });
    }

    if (!validation.isValidMobile.test(Mobile)) {
      return res
        .status(400)
        .send({ msg: "Please Enter a valid Mobile Number" });
    }

    // Password Validation
    if (!validation.isValid(Password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Password" });
    }

    let registerStudent = await StudentModel.create(data);
    return res.status(201).send({
      status: true,
      msg: "Student Data registered Successfully",
      data: registerStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

// Login Student

let loginStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!validation.isValidBody(data)) {
      return res.status(404).send({ status: false, msg: "No Data Provided" });
    }
    let { Email, Password } = data;
    if (!validation.isValid(Email)) {
      return res.status(400).send({ msg: "Please Enter Your Email" });
    }
    if (!validation.isValid(Password)) {
      return res.status(400).send({ msg: "Please Enter Your Password" });
    }

    let matchStudent = await StudentModel.findOne({ Email, Password });
    if (!matchStudent) {
      return res.status(200).send({ msg: "Student Not Registered" });
    } else {
      const token = jwt.sign(
        {
          studentId: matchStudent._id.toString(),
        },
        "MERN STACK",
        {
          expiresIn: "20000sec",
        }
      );

      return res
        .status(200)
        .send({ msg: "Student logged In Successfully", token });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};

module.exports = { createStudent, loginStudent };
