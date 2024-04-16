const router = require("express").Router();
var Workout = require("../models/workoutModel");

router.get("/api/workouts", (req, res) => {
  console.log("I am a GET route for /workout");
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: ["$exercises.duration"] },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/:id"),
  (req, res) => {
    console.log("This is a GET Routes for workout/:id");
    Workout.find({})(
      { _id: req.params.id },
      { lastWorkout: req.body.lastWorkout }
    ).then(function (workout) {
      res.json(workout);
    });
  };

// need help with put route
router.put("/api/workouts/:id", (req, res) => {
  console.log("POST api/workout/:id route");
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// body is undefined
router.post("/api/workouts", function ({ body }, res) {
  console.log("I'm a POST route for workouts");
  Workout.create(body)
    .then(function (dbWorkout) {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", function (req, res) {
  console.log("I'm a GET route for workouts/range");
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: ["$exercises.duration"] },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .sort({ day: 1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
