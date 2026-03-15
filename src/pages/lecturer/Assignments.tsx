import React, { useState } from "react";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
// Local placeholder for deleted mock data
const mockAssignments: any[] = [];
import { Plus, Calendar, CheckCircle, Clock, FileText, X, Upload } from "lucide-react";
import "../styles/Assignments.css";

const Assignments = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = mockAssignments.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  const activeCount = mockAssignments.filter((a) => a.status === "active").length;
  const completedCount = mockAssignments.filter((a) => a.status === "completed").length;

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="assignments-container"
      >
        <div className="assignments-header">
          <div>
            <h1 className="page-title">Assignments</h1>
            <p className="page-subtitle">
              {activeCount} active · {completedCount} completed
            </p>
          </div>
          <button
            className="create-btn"
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? <X size={16} /> : <Plus size={16} />}
            {showCreate ? "Cancel" : "Create Assignment"}
          </button>
        </div>

        {/* Create Assignment Form */}
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="create-form-card"
          >
            <h3 className="form-title">New Assignment</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="Assignment title" />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input">
                  <option>Data Structures (CS301)</option>
                  <option>Database Systems (CS302)</option>
                  <option>Operating Systems (CS303)</option>
                  <option>Artificial Intelligence (CS306)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" placeholder="Assignment details..." rows={3} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Upload PDF Document</label>
                <div className="file-upload-wrapper">
                  <Upload size={18} />
                  <span>Choose PDF file or drag and drop</span>
                  <input type="file" accept=".pdf" className="file-input" />
                </div>
              </div>
            </div>
            <button className="submit-btn">Create Assignment</button>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {[
            { id: "all" as const, label: "All" },
            { id: "active" as const, label: "Active" },
            { id: "completed" as const, label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="assignments-list">
          {filtered.map((assignment, i) => {
            const progress = Math.round(
              (assignment.submissions / assignment.total) * 100
            );
            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className={`assignment-card ${assignment.status}`}
              >
                <div className="assignment-header">
                  <div className="assignment-icon">
                    {assignment.status === "completed" ? (
                      <CheckCircle size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                  </div>
                  <div className="assignment-info">
                    <h3 className="assignment-title">{assignment.title}</h3>
                    <div className="assignment-meta">
                      <span className="assignment-subject">
                        {assignment.subject} ({assignment.code})
                      </span>
                      <span className="assignment-due">
                        <Calendar size={12} />
                        Due: {assignment.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className={`status-badge ${assignment.status}`}>
                    {assignment.status === "active" ? (
                      <><Clock size={12} /> Active</>
                    ) : (
                      <><CheckCircle size={12} /> Done</>
                    )}
                  </div>
                </div>

                <div className="assignment-progress">
                  <div className="progress-info">
                    <span className="progress-label">Submissions</span>
                    <span className="progress-value">
                      {assignment.submissions}/{assignment.total} ({progress}%)
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Assignments;
