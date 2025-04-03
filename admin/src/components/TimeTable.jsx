import { useState, useEffect } from "react";
import axios from "axios";

export default function TimetableApp() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(localStorage.getItem("selectedCourse") || "");
  const [timetable, setTimetable] = useState({});
  const [newCourse, setNewCourse] = useState("");
  const [editingCell, setEditingCell] = useState(null);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    axios.get(`${backendUrl}/time-table`).then((res) => {
      setCourses(res.data);
    });

    if (selectedCourse) {
      fetchTimetable(selectedCourse);
    }
  }, []);

  const fetchTimetable = (course) => {
    axios.get(`${backendUrl}/time-table/${course}`).then((res) => {
      setTimetable(res.data.schedule);
      setSelectedCourse(course);
      localStorage.setItem("selectedCourse", course); 
    });
  };

  const addCourse = () => {
    if (!newCourse.trim()) return;
  
    axios
      .post(`${backendUrl}/time-table/add-course`, { course: newCourse })
      .then(() => {
        const newTimetable = {
          Monday: ["", "", "", "", "", ""],
          Tuesday: ["", "", "", "", "", ""],
          Wednesday: ["", "", "", "", "", ""],
          Thursday: ["", "", "", "", "", ""],
          Friday: ["", "", "", "", "", ""],
          Saturday: ["", "", "", "", "", ""],
          Sunday: ["", "", "", "", "", ""],
        };
  
        setCourses([...courses, { course: newCourse }]);
        setSelectedCourse(newCourse); 
        setTimetable(newTimetable); 
        setNewCourse(""); 
      })
      .catch((error) =>
        console.error("Error adding course:", error.response?.data || error.message)
      );
  };
  
  

  const updateTimetable = (day, time) => {
    if (!selectedCourse || !newSubject.trim()) return;

    axios
      .put(`${backendUrl}/time-table/update`, {
        course: selectedCourse,
        day: day,
        time: time,
        subject: newSubject,
      })
      .then(() => {
        setTimetable((prev) => ({
          ...prev,
          [day]: { ...prev[day], [time]: newSubject },
        }));
        setEditingCell(null);
      })
      .catch((error) => console.error("Error updating timetable:", error.response?.data || error.message));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Timetable Manager</h1>

      {/* Add New Course */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Enter new course"
          className="border p-2 flex-grow rounded"
        />
        <button onClick={addCourse} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Course
        </button>
      </div>

      {/* Course Selection */}
      <select onChange={(e) => fetchTimetable(e.target.value)} value={selectedCourse} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.course} value={course.course}>
            {course.course}
          </option>
        ))}
      </select>

      {selectedCourse && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Day</th>
                {[...Array(6)].map((_, time) => (
                  <th key={time} className="border p-2">{`${9 + time}:00 - ${10 + time}:00 AM`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {Object.keys(timetable || {}).map((day) => (
                <tr key={day} className="text-center">
                  <td className="border p-2 font-semibold">{day}</td>
                  {[...Array(6)].map((_, time) => (
                    <td key={time} className="border p-2">
                      {editingCell?.day === day && editingCell?.time === time ? (
                        <input
                          type="text"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          className="border p-1 rounded w-full"
                          onBlur={() => updateTimetable(day, time)}
                          autoFocus
                        />
                      ) : (
                        <span
                          onClick={() => {
                            setEditingCell({ day, time });
                            setNewSubject(timetable[day]?.[time] || "");
                          }}
                          className="cursor-pointer hover:bg-blue-200 hover:rounded-md p-1 block "
                        >
                          {timetable[day]?.[time] || "-"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
