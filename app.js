var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // 👈 เพิ่มบรรทัดนี้

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var employeeRouter = require("./routes/employee");
var courseRouter = require("./routes/course");
var categoryRouter = require("./routes/category");

var app = express();

app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter); // http://localhost:3000
app.use("/api/users", usersRouter); // http://localhost:3000/users
app.use("/api/employee", employeeRouter); // http://localhost:3000/employee
app.use("/api/course", courseRouter); // http://localhost:3000/course
app.use("/api/category", categoryRouter); // http://localhost:3000/category

module.exports = app;
