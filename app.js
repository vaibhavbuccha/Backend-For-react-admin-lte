const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();

// routers
const AdminRouter = require("./router/Admin");
const DepartmentRouter = require("./router/Department");

// create App
const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("DB connected"))
  .catch((err) => console.log(err.stack));

// middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use("/api/v1/admin/", AdminRouter);
app.use("/api/v1/department/", DepartmentRouter);

// testing url
app.get("/", (req, res) => {
  res.send("Your Backend Is Up and Running");
});

// create server
app.listen(port, () => {
  console.log(`app is up and running on port ${port}`);
});
