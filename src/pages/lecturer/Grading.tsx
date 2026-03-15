import React, { useState } from "react";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
// Local placeholders for deleted mock data
const mockGrades: any[] = [];
const mockSubjects: any[] = [];
const mockGradeDistribution: any[] = [];
import { 
  Award, 
  BarChart3, 
  Calculator,
  Download,
  Filter,
  ChevronDown,
  TrendingUp,
  Users,
  BookOpen,
  PieChart,
  Percent
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart as RePieChart,
  Pie,
  Legend
} from "recharts";
import "../styles/Grading.css";

const COLORS = ["#1e3c72", "#2a5298", "#3b6cc4", "#5b8bd4", "#8cb0e0", "#bdd4f0"];

const Grading = () => {
  const [selectedSubject, setSelectedSubject] = useState("cs301");
  const [sortBy, setSortBy] = useState<"name" | "total" | "grade">("total");
  const [filterGrade, setFilterGrade] = useState("all");

  const getGrade = (total: number) => {
    if (total >= 70) return "A";
    if (total >= 60) return "B";
    if (total >= 50) return "C";
    if (total >= 40) return "D";
    return "F";
  };

  const getGradeClass = (grade: string) => {
    switch (grade) {
      case "A": return "grade-a";
      case "B": return "grade-b";
      case "C": return "grade-c";
      case "D": return "grade-d";
      default: return "grade-f";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "#10b981";
      case "B": return "#3b82f6";
      case "C": return "#f59e0b";
      case "D": return "#f97316";
      default: return "#ef4444";
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-label">Grade {label}</div>
          <div className="tooltip-value">{payload[0].value} students</div>
        </div>
      );
    }
    return null;
  };

  // Process grades data
  const gradesData = mockGrades
    .map(row => {
      const data = (row as any)[selectedSubject];
      if (!data) return null;
      const total = data.assignment + data.cat + data.exam;
      const grade = getGrade(total);
      return {
        ...row,
        ...data,
        total,
        grade
      };
    })
    .filter(Boolean)
    .filter(item => filterGrade === "all" || item.grade === filterGrade)
    .sort((a, b) => {
      if (sortBy === "name") return a.studentName.localeCompare(b.studentName);
      if (sortBy === "total") return b.total - a.total;
      return a.grade.localeCompare(b.grade);
    });

  // Calculate statistics
  const stats = {
    total: gradesData.length,
    average: (gradesData.reduce((acc, curr) => acc + curr.total, 0) / gradesData.length).toFixed(1),
    highest: Math.max(...gradesData.map(g => g.total)),
    lowest: Math.min(...gradesData.map(g => g.total)),
    passRate: ((gradesData.filter(g => g.grade !== "F").length / gradesData.length) * 100).toFixed(0)
  };

  // Get unique grades for filter
  const uniqueGrades = [...new Set(gradesData.map(g => g.grade))];

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grading-container"
      >
        {/* Header Section */}
        <div className="grading-header">
          <div className="header-left">
            <h1 className="page-title">Grading Portal</h1>
            <p className="page-subtitle">
              Manage and review student grades with automatic calculations and performance analytics
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <Download size={18} />
              Export Grades
            </button>
            <button className="btn btn-primary">
              <Calculator size={18} />
              Calculate All
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
              <Users size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Students</span>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+2 this week</span>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon-wrapper" style={{ background: '#d1fae5', color: '#10b981' }}>
              <Award size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.average}%</span>
              <span className="stat-label">Class Average</span>
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+5%</span>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon-wrapper" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <Percent size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.passRate}%</span>
              <span className="stat-label">Pass Rate</span>
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+8%</span>
            </div>
          </motion.div>
        </div>

        {/* Subject Selector */}
        <div className="subject-section">
          <div className="section-header">
            <h2 className="section-title">
              <BookOpen size={20} />
              Select Subject
            </h2>
            <span className="section-badge">{mockSubjects.length} subjects</span>
          </div>
          <div className="subject-selector">
            {mockSubjects.map((subject) => (
              <motion.button
                key={subject.id}
                className={`subject-chip ${selectedSubject === subject.id ? "active" : ""}`}
                onClick={() => setSelectedSubject(subject.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="chip-dot"
                  style={{ background: subject.color }}
                />
                <span className="chip-code">{subject.code}</span>
                <span className="chip-name">{subject.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grading-grid">
          {/* Grades Table */}
          <div className="content-card grades-table-card">
            <div className="card-header">
              <h2 className="card-title">
                <Calculator size={20} className="title-icon" />
                Grade Sheet — {mockSubjects.find((s) => s.id === selectedSubject)?.name}
              </h2>
              <div className="card-controls">
                <div className="filter-group">
                  <Filter size={16} className="filter-icon" />
                  <select 
                    className="filter-select"
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                  >
                    <option value="all">All Grades</option>
                    {uniqueGrades.map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                <div className="sort-group">
                  <span className="sort-label">Sort by:</span>
                  <select 
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="total">Total Score</option>
                    <option value="name">Student Name</option>
                    <option value="grade">Grade</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grades-table-wrapper">
              <table className="grading-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>ID</th>
                    <th className="marks-header">Assignments</th>
                    <th className="marks-header">CATs</th>
                    <th className="marks-header">Exam</th>
                    <th className="total-header">Total</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradesData.map((row, index) => (
                    <motion.tr
                      key={row.studentId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                    >
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar" style={{ background: `linear-gradient(135deg, #1e3c72, #2a5298)` }}>
                            {row.studentName.charAt(0)}
                          </div>
                          <span className="student-name">{row.studentName}</span>
                        </div>
                      </td>
                      <td>
                        <code className="id-code">{row.admissionNumber}</code>
                      </td>
                      <td className="marks-cell">
                        <span className="mark-value">{row.assignment}</span>
                      </td>
                      <td className="marks-cell">
                        <span className="mark-value">{row.cat}</span>
                      </td>
                      <td className="marks-cell">
                        <span className="mark-value">{row.exam}</span>
                      </td>
                      <td className="total-cell">
                        <span className="total-value">{row.total}</span>
                      </td>
                      <td>
                        <span className={`grade-badge ${getGradeClass(row.grade)}`}>
                          {row.grade}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {gradesData.length === 0 && (
                <div className="empty-table">
                  <Calculator size={40} />
                  <p>No grades available for this subject</p>
                </div>
              )}
            </div>

            {/* Table Footer */}
            <div className="table-footer">
              <div className="footer-info">
                Showing {gradesData.length} of {gradesData.length} students
              </div>
              <div className="footer-stats">
                <div className="footer-stat">
                  <span className="stat-label">Highest:</span>
                  <span className="stat-value">{stats.highest}</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-label">Lowest:</span>
                  <span className="stat-value">{stats.lowest}</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-label">Average:</span>
                  <span className="stat-value">{stats.average}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Charts and Stats */}
          <div className="right-column">
            {/* Grade Distribution Chart */}
            <div className="content-card distribution-card">
              <div className="card-header">
                <h2 className="card-title">
                  <BarChart3 size={20} className="title-icon" />
                  Grade Distribution
                </h2>
                <span className="card-badge">Current Term</span>
              </div>
              
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={mockGradeDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <XAxis
                      dataKey="grade"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={1500}>
                      {mockGradeDistribution.map((entry, index) => (
                        <Cell key={index} fill={getGradeColor(entry.grade)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Distribution Legend */}
              <div className="distribution-legend">
                {mockGradeDistribution.map((item) => (
                  <div key={item.grade} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: getGradeColor(item.grade) }}></span>
                    <span className="legend-label">Grade {item.grade}</span>
                    <span className="legend-count">{item.count} students</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="content-card insights-card">
              <div className="card-header">
                <h2 className="card-title">
                  <TrendingUp size={20} className="title-icon" />
                  Performance Insights
                </h2>
              </div>

              <div className="insights-list">
                <div className="insight-item">
                  <div className="insight-icon success">📈</div>
                  <div className="insight-content">
                    <span className="insight-label">Top Performer</span>
                    <span className="insight-value">
                      {gradesData.sort((a, b) => b.total - a.total)[0]?.studentName}
                    </span>
                    <span className="insight-detail">{gradesData.sort((a, b) => b.total - a.total)[0]?.total}%</span>
                  </div>
                </div>

                <div className="insight-item">
                  <div className="insight-icon warning">📊</div>
                  <div className="insight-content">
                    <span className="insight-label">Needs Improvement</span>
                    <span className="insight-value">
                      {gradesData.filter(g => g.grade === "F").length} students
                    </span>
                    <span className="insight-detail">Below 40%</span>
                  </div>
                </div>

                <div className="insight-item">
                  <div className="insight-icon info">⭐</div>
                  <div className="insight-content">
                    <span className="insight-label">Honor Roll</span>
                    <span className="insight-value">
                      {gradesData.filter(g => g.grade === "A").length} students
                    </span>
                    <span className="insight-detail">Grade A</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="quick-stat">
                  <span className="quick-stat-label">Assignment Avg</span>
                  <div className="quick-stat-bar">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${gradesData.reduce((acc, g) => acc + g.assignment, 0) / gradesData.length}%` }}
                    ></div>
                  </div>
                  <span className="quick-stat-value">
                    {(gradesData.reduce((acc, g) => acc + g.assignment, 0) / gradesData.length).toFixed(1)}%
                  </span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-label">CAT Average</span>
                  <div className="quick-stat-bar">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${gradesData.reduce((acc, g) => acc + g.cat, 0) / gradesData.length}%` }}
                    ></div>
                  </div>
                  <span className="quick-stat-value">
                    {(gradesData.reduce((acc, g) => acc + g.cat, 0) / gradesData.length).toFixed(1)}%
                  </span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-label">Exam Average</span>
                  <div className="quick-stat-bar">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${gradesData.reduce((acc, g) => acc + g.exam, 0) / gradesData.length}%` }}
                    ></div>
                  </div>
                  <span className="quick-stat-value">
                    {(gradesData.reduce((acc, g) => acc + g.exam, 0) / gradesData.length).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Grade Summary */}
            <div className="content-card summary-card">
              <h3 className="summary-title">Grade Summary</h3>
              <div className="summary-grid">
                {mockGradeDistribution.map((item) => (
                  <div key={item.grade} className="summary-item">
                    <span className={`summary-grade grade-${item.grade.toLowerCase()}`}>
                      {item.grade}
                    </span>
                    <span className="summary-count">{item.count}</span>
                    <span className="summary-percentage">
                      {((item.count / gradesData.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Grading;