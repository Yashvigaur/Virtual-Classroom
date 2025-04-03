const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  course: { type: String, required: true, unique: true },

  schedule: {
    type: Object,
    default: {
      Monday: ["", "", "", "", "", ""],
      Tuesday: ["", "", "", "", "", ""],
      Wednesday: ["", "", "", "", "", ""],
      Thursday: ["", "", "", "", "", ""],
      Friday: ["", "", "", "", "", ""],
    },
  },
});

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;
