import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "@/components/TeacherLayout";
import api from "@/services/api";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  GraduationCap,
  TrendingUp,
  Calendar,
  ChevronDown,
  Download,
  UserPlus,
  ArrowUpDown
} from "lucide-react";
import "../styles/Students.css";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "gpa" | "attendance">("name");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/admin/users?role=student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = students
    .filter(
      (s) =>
        s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return (a.full_name || "").localeCompare(b.full_name || "");
      return 0;
    });

  const getGpaClass = (gpa: number) => {
    if (gpa >= 3.5) return "gpa-excellent";
    if (gpa >= 3.0) return "gpa-good";
    if (gpa >= 2.5) return "gpa-average";
    return "gpa-low";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "#10b981";
    if (attendance >= 75) return "#f59e0b";
    return "#ef4444";
  };

  const stats = {
    total: students.length,
    averageGpa: "N/A",
    averageAttendance: "N/A",
  };

  if (loading) return <div>Loading...</div>;

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="students-container"
      >
        {/* Header Section */}
        <div className="students-header">
          <div className="header-left">
            <h1 className="page-title">Students</h1>
            <p className="page-subtitle">
              Manage and monitor all your students across different courses
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-icon-wrapper" style={{ background: '#e8f0fe', color: '#1e3c72' }}>
              <GraduationCap size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon-wrapper" style={{ background: '#e6f7ff', color: '#0066cc' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.averageGpa}</span>
              <span className="stat-label">Average GPA</span>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon-wrapper" style={{ background: '#f0f9ff', color: '#0284c7' }}>
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.averageAttendance}</span>
              <span className="stat-label">Avg Attendance</span>
            </div>
          </motion.div>
        </div>

        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="controls-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 15H21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 3V21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 3V21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span>Showing {filtered.length} of {students.length} students</span>
          {search && <span>Filtered by: "{search}"</span>}
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, i) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                  >
                    <td>
                      <div className="student-name-cell">
                        <div className="avatar" style={{ background: `linear-gradient(135deg, #1e3c72, #2a5298)` }}>
                          {(student.full_name || "S").charAt(0)}
                        </div>
                        <div className="student-info">
                          <span className="student-name">{student.full_name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code className="id-code">{student.email}</code>
                    </td>
                    <td>
                      <button 
                        className="action-btn"
                        onClick={() => navigate(`/teacher/students/${student.id}`)}
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid-view">
            {filtered.map((student, i) => (
              <motion.div
                key={student.id}
                className="student-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/teacher/students/${student.id}`)}
              >
                <div className="card-header">
                  <div className="student-avatar-large" style={{ background: `linear-gradient(135deg, #1e3c72, #2a5298)` }}>
                    {(student.full_name || "S").charAt(0)}
                  </div>
                  <button className="card-menu">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                
                <div className="card-body">
                  <h3 className="card-student-name">{student.full_name}</h3>
                  <code className="card-student-id">{student.email}</code>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state-icon">
              <Search size={48} />
            </div>
            <h3>No students found</h3>
            <p>We couldn't find any students matching "{search}"</p>
            <button className="btn btn-outline" onClick={() => setSearch("")}>
              Clear search
            </button>
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default Students;