const Timetable = require("../models/timetableModels");

// Get all timetables
exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get timetable by course
exports.getTimetableByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    const timetable = await Timetable.findOne({ course });

    if (!timetable) return res.status(404).json({ message: "Course not found!" });

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { course } = req.body;

    // Check if course already exists
    const existingCourse = await Timetable.findOne({ course });
    if (existingCourse) return res.status(400).json({ message: "Course already exists!" });

    const newCourse = new Timetable({ course, schedule: {} });
    await newCourse.save();

    res.json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update timetable
exports.updateTimetable = async (req, res) => {
  try {
    const { course, day, time, subject } = req.body;

    console.log("🟢 Request received:", req.body);

    if (!course || !day || time === undefined || !subject.trim()) {
      return res.status(400).json({ message: "Invalid request data!" });
    }

  
    const updatedTimetable = await Timetable.findOneAndUpdate(
      { course },
      { $set: { [`schedule.${day}.${time}`]: subject } }, 
      { new: true, upsert: true } 
    );

    if (!updatedTimetable) {
      return res.status(404).json({ message: "Course not found!" });
    }

    console.log("✅ Updated Timetable:", updatedTimetable.schedule);
    res.json({ message: "Timetable updated!", updatedSchedule: updatedTimetable.schedule });
  } catch (error) {
    console.error("❌ Error updating timetable:", error.message);
    res.status(500).json({ error: error.message });
  }
};

