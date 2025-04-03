const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.get("/", timetableController.getAllTimetables);
router.get("/:course", timetableController.getTimetableByCourse);
router.post("/add-course", timetableController.addCourse);
router.put("/update", timetableController.updateTimetable);

module.exports = router;
