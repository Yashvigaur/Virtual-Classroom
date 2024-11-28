import { useState } from "react";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import { Avatar, Stack, IconButton } from "@mui/material";
import { VisuallyHiddenInput } from "../styles/StyledComponents";
import { CameraAlt as Camera } from "@mui/icons-material";
import { useFileHandler } from "6pp";

function Students() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const avatar = useFileHandler("single");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("branch", branch);
    formData.append("batch", batch);
    formData.append("rollNo", rollNo);
    formData.append("fatherName", fatherName);
    formData.append("phoneNo", phoneNo);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar.file) {
      formData.append("avatar", avatar.file);
      console.log(avatar.file)
      
    }
    else{
      console.log("avatar file is not present");
    }

    try {
      const response = await axios.post(`${backendUrl}/api/v5/enroll-student`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Student Enrolled Successfully");
      }
    } catch (error) {
      console.error("Error enrolling student:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 h-[80%] p-8 bg-gray-50 ml-[20%]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-violet-700 text-center mb-4">
            Enroll Students for Your College:)
          </h1>

          <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              <Stack position="relative" width="10rem" alignItems="center">
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                  component="label"
                >
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  <Camera />
                </IconButton>
              </Stack>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
              <input
                type="number"
                placeholder="Student Roll No"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
              <input
                type="text"
                placeholder="Enters Student Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
              <input
                type="number"
                placeholder="Enter Student Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
              <input
                type="email"
                placeholder="Generate Student College Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
              <input
                type="password"
                placeholder="Generate Student Account Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <select
                name="studentBranch"
                id="studentBranch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 transition duration-200"
                required
              >
                <option  value="Branch">Choose Student Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSE AI">CSE AI</option>
                <option value="CSE IOT">CSE IOT</option>
                <option value="CSE DATASCIENCE">CSE DATASCIENCE</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Electronics Engineering">Electronics Engineering</option>
              </select>

              <select
              
                name="year"
                id="studentYear"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 transition duration-200"
                required
              >
                <option  value="choose student year">Choose Student Batch</option>
                <option value="2017-2021">2017-2021</option>
                <option value="2018-2022">2018-2022</option>
                <option value="2019-2023">2019-2023</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-violet-600 text-white font-semibold text-lg rounded-md hover:bg-violet-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              {loading ? "Enrolling..." : "Enroll Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Students;