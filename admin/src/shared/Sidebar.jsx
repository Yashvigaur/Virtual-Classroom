/*

Copyright 2024 Himanshu Dinkar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { ContextStore } from "../store/ContextStore";
import Logo from "../components/Dashboard/Logo";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import { RoleContext } from "../context/RoleContext";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventNoteIcon from '@mui/icons-material/EventNote';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from "../components/Model";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { userRole } = useContext(RoleContext);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {logout} = useAuth();

  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setIsLoading(true);
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        setIsLoading(false);
        navigate(path);
      }, 1500);
    }
  };

  // Sidebar content component to avoid repetition
  const SidebarContent = () => (
    <ul className="flex flex-col md:ml-10 gap-5 w-full">
      <Logo />
      <div className="flex gap-4">
        <li
          onClick={() => handleNavigation("/dashboard")}
          className={`list-style-none flex items-center gap-4 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer hover:text-gray-700 transition-all duration-75 ${
            isActive("/dashboard")
              ? "bg-white text-black border rounded-md"
              : "text-white"
          }`}
        >
          <DashboardIcon />
          Dashboard
        </li>
      </div>

      {userRole === 'Director' && <li
        onClick={() => handleNavigation("/add-teachers")}
        className={`list-style-none font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/add-teachers")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        Add Teachers
      </li>}

      {userRole === 'Registrar' && <li
        onClick={() => handleNavigation("/enroll-students")}
        className={`list-style-none font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/enroll-students")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        Enroll Students
      </li>}

      {(userRole === 'Teacher' || userRole === 'Director') && <li
        onClick={() => handleNavigation("/announcement")}
        className={`list-style-none flex items-center gap-2 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/announcement")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <CampaignIcon />
        Announcement
      </li>}

      

      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/timetable")}
        className={`list-style-none flex gap-4 items-center font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/timetable")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <EventNoteIcon />
        Time Table
      </li>}

      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/ai-predictor")}
        className={`list-style-none flex gap-4 items-center font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/ai-predictor")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <EventNoteIcon />
        AI Predictor
      </li>}

      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/question-generator")}
        className={`list-style-none flex gap-4 items-center font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/question-generator")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <EventNoteIcon />
        Question Generator
      </li>}
      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/post-quiz")}
        className={`list-style-none flex items-center gap-4 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/post-quiz")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <QuizIcon />
        Quiz
      </li>}

      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/post-assignment")}
        className={`list-style-none flex items-center gap-4 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/post-assignment")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <AssignmentIcon />
        Assignment
      </li>}

      {userRole === 'Teacher' && <li
        onClick={() => handleNavigation("/student-marks-attendance")}
        className={`list-style-none flex items-center gap-4 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/student-marks-attendance")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        <AssignmentIcon />
        Fill Student Details
      </li>}

      {userRole === 'Registrar' && <li
        onClick={() => handleNavigation("/student-detail")}
        className={`list-style-none font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/admin-live")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        Student Details
      </li>}

      {userRole === 'Registrar' && <li
        onClick={() => handleNavigation("/registrar-student")}
        className={`list-style-none font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/registrar-student")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        Student Fees Details
      </li>}

      {userRole === 'Registrar' && <li
        onClick={() => handleNavigation("/teachers")}
        className={`list-style-none font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
          isActive("/admin-live")
            ? "bg-white text-black border rounded-md"
            : "text-white"
        }`}
      >
        Teacher Details
      </li>}

      {(userRole === 'Teacher' || userRole === 'Director') && <div className="flex items-center gap-4">
        <li
          onClick={() => setIsModalOpen(true)}
          className={`list-style-none flex items-center gap-4 font-medium focus:bg-blue-400 p-3 w-[80%] cursor-pointer ${
            isActive("/admin-live")
              ? "bg-white text-black border rounded-md"
              : "text-white"
          }`}
        >
          <LiveTvIcon />
          Go Live Class
        </li>
      </div>}

      {/* Logout Button */}
      <div onClick={logout} className="mt-5 mr-4 mb-8">
        <li
          className="list-style-none flex items-center gap-4 font-medium p-3 w-[80%] cursor-pointer transition-all duration-300 bg-white hover:bg-gray-100 text-indigo-800 rounded-lg shadow-md hover:shadow-lg border border-indigo-100"
        >
          <LogoutIcon className="text-indigo-800" />
          <span>Logout</span>
        </li>
      </div>
    </ul>
  );

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-blue-700 text-white"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-tr from-indigo-800 to-blue-700 text-white z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} overflow-y-auto p-4`}>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="sidebar fixed top-0 left-0 h-screen flex flex-col w-[20%] bg-gradient-to-tr from-indigo-800 to-blue-700 text-white">
          <SidebarContent />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => console.log("Handle Room Join")}
        email=""
        setEmail={() => {}}
        roomId=""
        setRoomId={() => {}}
        loading={false}
      />

      {/* Loader */}
      {isLoading && (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100 absolute top-0 left-0 z-50">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-20 h-20"
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;