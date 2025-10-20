"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      title: DataTypes.STRING,
      detail: DataTypes.STRING,
      image: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "courses",
      timestamps: false,
    }
  );
  Course.associate = function (models) {
    // define association here
  };
  // sequelize.sync();
  return Course;
};
