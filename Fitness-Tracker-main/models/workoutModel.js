const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Select workout type",
      },
      name: {
        type: String,
        required: "Select workout name",
      },
      duration: {
        type: Number,
        required: "Add total duration length",
      },
      weight: {
        type: Number,
        required: "weight used",
      },
      reps: {
        type: Number,
        required: "How many reps",
      },
      sets: {
        type: Number,
        required: "how many sets",
      },
      distance: {
        type: Number,
        required: "length of distance",
      },
    },
  ],
});

const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
