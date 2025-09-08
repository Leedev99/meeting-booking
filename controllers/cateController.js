const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models/index");
const { NOW } = require("sequelize");

exports.index = async (req, res, next) => {
  const cate = await models.Category.findAll(); // select * form User
  res.status(200).json({
    message: "success",
    data: cate,
  });
};
exports.userbyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cate = await models.Category.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!cate) {
      const error = new Error("category not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "success",
      data: cate,
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
    const { name } = req.body;

    // check duplicate email
    const existCate = await models.Category.findOne({
      where: { name: name },
    });

    if (existCate) {
      const error = new Error("Duplicate name please try new name");
      error.statusCode = 400;
      throw error;
    }
    const dataCate = await models.Category.create({
      name,
    });
    res.status(201).json({
      message: "success inserted",
      data: {
        id: dataCate.id,
        name: dataCate.name,
      },
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
exports.update = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (String(req.params.id) !== String(id)) {
      const error = new Error("ລະຫັດບໍຖືກຕ້ອງ");
      error.statusCode = 400;
      throw error;
    }

    const existingCate = await models.Category.findByPk(id);
    if (!existingCate) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    const duplicateName = await models.Category.findOne({
      where: {
        name: name,
        id: { [models.Sequelize.Op.ne]: id },
      },
    });

    if (duplicateName) {
      const error = new Error("Duplicate name please try new name");
      error.statusCode = 400;
      throw error;
    }
    const updateResult = await models.Category.update(
      {
        name,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
    const category = await models.Category.findByPk(id);

    res.status(200).json({
      message: "Category has been successfully updated",
      data: {
        id: category.id,
        name: category.name,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    const statusCode = error.statusCode || 500;
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
    const cate = await models.Category.findByPk(id);
    if (!cate) {
      const error = new Error("Data not found");
      error.statusCode = 404;
      throw error;
    }
    await models.Category.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Category has been success deleted",
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
