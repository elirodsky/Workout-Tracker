const router = require("express").Router();
const Workout = require("../models/workout");

//displaying workouts
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        "entireDuration":
        {
          $sum: "$exercise.duration"
        },
      },
    },
  ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
})

// obtaining all workouts descending in range
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ _id: -1 })
    .limit(5)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

//post new workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body).then((dbWorkout) => {
    res.json(dbWorkout);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

