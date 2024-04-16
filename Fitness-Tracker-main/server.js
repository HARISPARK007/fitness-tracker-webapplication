const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(require("./routes/apiRoutes.js"));
require("./routes/htmlRoutes")(app);

// remember to change the url/localhost/whateverdatabaseICreate
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Handle API routes HERE

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
