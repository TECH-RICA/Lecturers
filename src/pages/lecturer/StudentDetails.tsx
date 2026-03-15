import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  Award, 
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Search,
  ExternalLink
} from "lucide-react";
import "./styles/StudentDetails.css";

const StudentDetails = () => {
  const { studentId } = useParams<{ studentId: string }>();
  
  // Placeholder student data
  const student = {
    id: studentId,
    name: "Student Name",
    email: "student@example.com",
    admissionNumber: studentId,
    course: "Computer Science",
    year: 1,
    semester: 1,
    phone: "N/A",
    gpa: 3.5,
    attendance: 90,
    status: "Active"
  };

  // Placeholder submissions data
  const submissions = [
    {
      id: 1,
      studentId: Number(studentId),
      title: "Assignment 1: Introduction to Programming",
      type: "assignment",
      date: "2023-10-26",
      status: "graded",
      marks: 85,
      total: 100,
      pdfLink: "#"
    },
    {
      id: 2,
      studentId: Number(studentId),
      title: "Lab Report: Data Structures",
      type: "lab",
      date: "2023-11-01",
      status: "pending",
      marks: null,
      total: 50,
      pdfLink: "#"
    },
    {
      id: 3,
      studentId: Number(studentId),
      title: "Project Proposal: Web Development",
      type: "assignment",
      date: "2023-11-15",
      status: "graded",
      marks: 40,
      total: 50,
      pdfLink: "#"
    }
  ];

  const [markingId, setMarkingId] = useState<number | null>(null);
  const [marks, setMarks] = useState<number>(0);

  const handleMarking = (id: number) => {
    setMarkingId(id);
    const sub = submissions.find(s => s.id === id);
    setMarks(sub?.marks || 0);
  };

  const saveMarks = () => {
    console.log(`Saving marks for submission ${markingId}: ${marks}`);
    setMarkingId(null);
  };

  if (!student) return <div>Student not found</div>;

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="student-details-container"
      >
        <div style={{ marginBottom: "2rem" }}>
          <Link to="/teacher/students" className="back-link">
            <ArrowLeft size={16} />
            Back to Students
          </Link>
          <div className="header-content">
            <h1 className="page-title">Student Profile</h1>
            <div className={`status-badge ${student.status.toLowerCase()}`}>
              {student.status}
            </div>
          </div>
        </div>

        <div className="details-grid">
          {/* Main Info Card */}
          <div className="info-card">
            <div className="profile-section">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <div className="profile-info">
                <h3>{student.name}</h3>
                <p>{student.admissionNumber}</p>
              </div>
            </div>

            <div className="details-list">
              <div className="detail-row">
                <Mail size={16} />
                <span>{student.email}</span>
              </div>
              <div className="detail-row">
                <Phone size={16} />
                <span>{student.phone}</span>
              </div>
              <div className="detail-row">
                <BookOpen size={16} />
                <span>{student.course}</span>
              </div>
              <div className="detail-row">
                <Calendar size={16} />
                <span>Year {student.year}, Semester {student.semester}</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Attendance</span>
                <span className="stat-value">{student.attendance}%</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">GPA</span>
                <span className="stat-value">{student.gpa}</span>
              </div>
            </div>
          </div>

          {/* Submissions Section */}
          <div className="submissions-section">
            <h2 className="section-title">Academic History</h2>
            <div className="submissions-list">
              {submissions.map((sub) => (
                <div key={sub.id} className="submission-card">
                  <div className="submission-main">
                    <div className="submission-type">
                      {sub.type === "assignment" ? <FileText size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="submission-info">
                      <h4>{sub.title}</h4>
                      <div className="submission-meta">
                        <Clock size={12} />
                        <span>Submitted: {sub.date}</span>
                      </div>
                    </div>
                    <div className="submission-status">
                      {sub.status === "graded" ? (
                        <div className="grade-badge">
                          <CheckCircle size={14} />
                          <span>{sub.marks}/{sub.total}</span>
                        </div>
                      ) : (
                        <div className="pending-badge">Pending</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="submission-actions">
                    <a href={sub.pdfLink} target="_blank" rel="noopener noreferrer" className="view-pdf-btn">
                      <ExternalLink size={14} /> View Submission
                    </a>
                    {sub.status === "pending" && (
                      <button onClick={() => handleMarking(sub.id)} className="grade-btn">
                        <Award size={14} /> Grade Now
                      </button>
                    )}
                  </div>

                  {markingId === sub.id && (
                    <div className="marking-panel">
                      <div className="marks-input-group">
                        <label>Enter Marks (out of {sub.total}):</label>
                        <input 
                          type="number" 
                          max={sub.total}
                          value={marks}
                          onChange={(e) => setMarks(Number(e.target.value))}
                        />
                      </div>
                      <div className="marking-actions">
                        <button onClick={saveMarks} className="save-btn">Save Grade</button>
                        <button onClick={() => setMarkingId(null)} className="cancel-btn">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {submissions.length === 0 && (
                <div className="no-submissions">
                  <Search size={32} />
                  <p>No submissions found for this student.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default StudentDetails;
