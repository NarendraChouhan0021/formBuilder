const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./routes/router");

//db
mongoose
  .connect("mongodb://localhost/form", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB is connected");
  });

//upload
const storage = multer.diskStorage({
  destination: "./public",
  filename(req, file, cb) {
    cb(
      null,
      "google-form-content-questions-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

//middleware
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

//routes
app.get("/", async (req, res) => {
  try {
    res.send({});
  } catch (e) {
    res.send(e);
  }
});

app.use("/api", router);

app.listen(5000, () => {
  console.log("app listen on port", 5000);
});
