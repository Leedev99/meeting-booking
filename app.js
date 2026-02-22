const express = require("express");
const path = require("path");
const { readdirSync } = require('fs');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); 

//  V1 ---------------------------------------------------
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
// const employeeRouter = require("./routes/employee");
// const courseRouter = require("./routes/course");
// const categoryRouter = require("./routes/category");

const app = express();

app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//  V1 ---------------------------------------------------
// app.use("/api", indexRouter); // http://localhost:3000
// app.use("/api/users", usersRouter); // http://localhost:3000/users
// app.use("/api/employee", employeeRouter); // http://localhost:3000/employee
// app.use("/api/course", courseRouter); // http://localhost:3000/course
// app.use("/api/category", categoryRouter); // http://localhost:3000/category

//  V2 ---------------------------------------------------
readdirSync('./routes')
.map((r) => app.use('/api/' + r.split('.')[0], require('./routes/'+r)));

module.exports = app;
