const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models/index");
const { NOW } = require("sequelize");
exports.index = async (req, res, next) => {
  const course = await models.Course.findAll(); // select * form User
  res.status(200).json({
    message: "success",
    data: course,
  });
};
exports.userbyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await models.Course.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!course) {
      const error = new Error("course not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "success",
      data: course,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
// Insert data
exports.insert = async (req, res, next) => {
  try {
    const { title, detail } = req.body;

    // check duplicate email
    const existEmail = await models.Course.findOne({
      where: { title: title },
    });

    if (existEmail) {
      const error = new Error("Duplicate course name please try new name");
      error.statusCode = 400;
      throw error;
    }
    const dataCourse = await models.Course.create({
      title,
      detail,
    });
    res.status(201).json({
      message: "success inserted",
      data: {
        id: dataCourse.id,
        title: dataCourse.title,
        detail: dataCourse.detail,
      },
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
// Update data
exports.update = async (req, res, next) => {
  try {
    const { id, title, detail } = req.body;

    // Convert both IDs to strings for comparison (in case one is number, one is string)
    if (String(req.params.id) !== String(id)) {
      const error = new Error("ລະຫັດບໍຖືກຕ້ອງ");
      error.statusCode = 400;
      throw error;
    }

    // Check if course exists before updating
    const existingCourse = await models.Course.findByPk(id);
    if (!existingCourse) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    // Check duplicate name (exclude current record)
    const duplicateName = await models.Course.findOne({
      where: {
        title: title,
        id: { [models.Sequelize.Op.ne]: id }, // Exclude current record
      },
    });

    if (duplicateName) {
      const error = new Error("Duplicate name please try new name");
      error.statusCode = 400;
      throw error;
    }

    // Update the course
    await models.Course.update(
      {
        title,
        detail,
        updated_at: new Date(), // Fixed: use new Date() instead of Date.UTC.NOW()
      },
      {
        where: {
          id: id,
        },
      }
    );

    // Fetch the updated record to return in response
    const updatedCourse = await models.Course.findByPk(id);

    res.status(200).json({
      // Changed from 201 to 200 for updates
      message: "Course has been successfully updated",
      data: {
        id: updatedCourse.id,
        course: updatedCourse.course,
        detail: updatedCourse.detail,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Default to 500 if no statusCode
    return res.status(statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
//destory
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await models.Course.findByPk(id);
    if (!course) {
      const error = new Error("Data not found");
      error.statusCode = 404;
      throw error;
    }
    await models.Course.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "course has been success deleted",
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
