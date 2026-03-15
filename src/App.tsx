import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/lecturer/Dashboard";
import MySubjects from "./pages/lecturer/MySubjects";
import Students from "./pages/lecturer/Students";
import Assignments from "./pages/lecturer/Assignments";
import Grading from "./pages/lecturer/Grading";
import Schedule from "./pages/lecturer/Schedule";
import Messages from "./pages/lecturer/Messages";
import LecturerProfile from "./pages/lecturer/LecturerProfile";
import ViewClass from "./pages/lecturer/ViewClass";
import StudentDetails from "./pages/lecturer/StudentDetails";
import "./App.css";

const App = () => (
  <AuthProvider>   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* lecturer Portal */}
        <Route path="/lecturer" element={<Dashboard />} />
        <Route path="/lecturer/subjects" element={<MySubjects />} />
        <Route path="/lecturer/subjects/:subjectId" element={<ViewClass />} />
        <Route path="/lecturer/students" element={<Students />} />
        <Route path="/lecturer/students/:studentId" element={<StudentDetails />} />
        <Route path="/lecturer/assignments" element={<Assignments />} />
        <Route path="/lecturer/grading" element={<Grading />} />
        <Route path="/lecturer/schedule" element={<Schedule />} />
        <Route path="/lecturer/messages" element={<Messages />} />
        <Route path="/lecturer/profile" element={<LecturerProfile />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
