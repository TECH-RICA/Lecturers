import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import api from "@/services/api";
import { Users, Clock, ArrowRight } from "lucide-react";
import "../styles/MySubjects.css";

const MySubjects = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/teachers/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="subjects-container"
      >
        <h1 className="page-title">My Subjects</h1>
        <p className="page-subtitle">
          {courses.length} subjects assigned this semester
        </p>

        <div className="subjects-grid">
          {courses.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="subject-card"
            >
              <div
                className="subject-color-bar"
                style={{ background: '#3b82f6' }}
              />
              <div className="subject-content">
                <div className="subject-code">{subject.code}</div>
                <div className="subject-name">{subject.name}</div>

                <div className="subject-details">
                  <div className="detail-item">
                    <Users size={14} />
                    <span>N/A students</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>N/A schedule</span>
                  </div>
                </div>

                <div className="subject-actions">
                  <button 
                    className="action-btn primary"
                    onClick={() => navigate(`/teacher/my-subjects`)}
                  >
                    View Class
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {courses.length === 0 && <p className="text-muted">No subjects assigned.</p>}
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default MySubjects;
