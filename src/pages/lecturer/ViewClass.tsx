import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import { 
  Clock, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Users, 
  Calendar, 
  Download, 
  ExternalLink,
  Plus,
  ArrowLeft,
  Book
} from "lucide-react";
import "./styles/ViewClass.css";

const ViewClass = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = { id: subjectId, name: "Class View", code: subjectId, unit: "N/A", students: 0, schedule: "N/A", course: "N/A" };
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"materials" | "students" | "assignments">("materials");

  if (!subject) return <div>Subject not found</div>;

  const materials: any[] = [];

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="view-class-container"
      >
        <div className="view-class-header">
          <Link to="/lecturer/subjects" className="back-link">
            <ArrowLeft size={16} />
            Back to Subjects
          </Link>
          <div className="header-main">
            <div>
              <h1 className="class-title">{subject.name} ({subject.code})</h1>
              <div className="class-meta">
                <span><BookOpen size={14} /> {subject.unit}</span>
                <span><Users size={14} /> {subject.students} Students</span>
                <span><Clock size={14} /> {subject.schedule}</span>
              </div>
            </div>
            <button className="post-material-btn" onClick={() => setShowForm(!showForm)}>
              <Plus size={16} />
              Post Material
            </button>
          </div>
        </div>

        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="post-form-card"
          >
            <h3>Post New Material</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Material Title</label>
                <input type="text" placeholder="e.g. Unit 1: Introduction" />
              </div>
              <div className="form-group">
                <label>Material Type</label>
                <select>
                  <option value="unit">Unit/Coursework</option>
                  <option value="cat">CAT</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>PDF Link (Direct URL)</label>
                <input type="url" placeholder="https://example.com/material.pdf" />
              </div>
            </div>
            <div className="form-actions">
              <button className="submit-btn">Post Material</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </motion.div>
        )}

        <div className="class-content-grid">
          <div className="main-content">
            <div className="content-tabs">
              <button 
                className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
                onClick={() => setActiveTab("materials")}
              >
                Materials
              </button>
              <button 
                className={`tab-btn ${activeTab === "assignments" ? "active" : ""}`}
                onClick={() => setActiveTab("assignments")}
              >
                Assignments & CATs
              </button>
            </div>

            <div className="materials-list">
              {activeTab === "materials" ? (
                materials.filter(m => m.type === "unit").map((item) => (
                  <div key={item.id} className="material-item">
                    <div className="material-icon unit">
                      <Book size={20} />
                    </div>
                    <div className="material-info">
                      <h4>{item.title}</h4>
                      <span>Posted on {item.date}</span>
                    </div>
                    <div className="material-actions">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="icon-btn" title="View in New Tab">
                        <ExternalLink size={16} />
                      </a>
                      <a href={item.link} download className="icon-btn" title="Download">
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                materials.filter(m => m.type !== "unit").map((item) => (
                  <div key={item.id} className="material-item">
                    <div className={`material-icon ${item.type}`}>
                      {item.type === "cat" ? <FileText size={20} /> : <GraduationCap size={20} />}
                    </div>
                    <div className="material-info">
                      <h4>{item.title}</h4>
                      <span className="type-badge">{item.type.toUpperCase()}</span>
                      <span>Posted on {item.date}</span>
                    </div>
                    <div className="material-actions">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="icon-btn">
                        <ExternalLink size={16} />
                      </a>
                      <a href={item.link} download className="icon-btn">
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="side-content">
            <div className="info-card">
              <h3>Teaching Details</h3>
              <div className="info-item">
                <label>Course</label>
                <p>{subject.course}</p>
              </div>
              <div className="info-item">
                <label>Unit Name</label>
                <p>{subject.name}</p>
              </div>
              <div className="info-item">
                <label>Unit Code</label>
                <p>{subject.code}</p>
              </div>
              <div className="info-item">
                <label>Schedule</label>
                <p>{subject.schedule}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default ViewClass;
