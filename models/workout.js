const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercise: [
    {
      type: {
        type: String,
        trim: true,
        required: "Input an exercise type",
      },
      name: {
        type: String,
        trim: true,
        required: "Input an exercise name",
      },
      duration: {
        type: Number,
        required: "Input an exercise duration",
      },
      distance: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      }
    }
  ]
});


const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;