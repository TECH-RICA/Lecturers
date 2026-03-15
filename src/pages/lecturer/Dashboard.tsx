import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TeacherLayout from "@/components/TeacherLayout";
import { useAuth } from "@/lib/auth-context";
import api from "@/services/api";
import {
  Users,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  ArrowRight,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, coursesRes] = await Promise.all([
          api.get('/admin/stats'), 
          api.get('/teachers/courses')
        ]);
        setStats(statsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="dashboard-container"
      >
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome back, {user?.full_name?.split(" ")[0] || "Lecturer"}
            </h1>
            <p className="welcome-text">
              You are currently managing <span className="highlight">{courses.length} courses</span> and overseeing students.
            </p>
          </div>
          <div className="welcome-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {[
            {
              icon: Users,
              label: "Total Students",
              value: stats?.students || 0,
              change: "Global",
              bgColor: "#e8f0fe",
              iconColor: "#1e3c72",
            },
            {
              icon: ClipboardList,
              label: "My Courses",
              value: courses.length,
              change: "Active",
              bgColor: "#e6f7ff",
              iconColor: "#0066cc",
            },
            {
              icon: CalendarDays,
              label: "Classes Today",
              value: "0",
              change: "View Schedule",
              bgColor: "#e8f0fe",
              iconColor: "#1e3c72",
            },
            {
              icon: TrendingUp,
              label: "Avg Attendance",
              value: `0%`,
              change: "N/A",
              bgColor: "#e6f7ff",
              iconColor: "#0066cc",
            },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.iconColor }}>
                  <stat.icon size={20} />
                </div>
                <span className="stat-change">{stat.change}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="dashboard-grid">
          {/* My Courses */}
          <div className="content-card deadlines-card">
            <div className="card-header">
              <h2 className="card-title">
                <BookOpen size={20} className="title-icon" />
                My Courses
              </h2>
              <span className="card-badge">{courses.length} assigned</span>
            </div>
            <div className="deadlines-list">
              {courses.slice(0, 4).map((c) => (
                <div key={c.id} className="deadline-item">
                  <div className="deadline-info">
                    <span className="deadline-subject">{c.code}</span>
                    <span className="deadline-title">{c.name}</span>
                  </div>
                  <div className="deadline-meta">
                     <span className="deadline-submissions">
                      {c.departments?.name}
                    </span>
                  </div>
                </div>
              ))}
              {courses.length === 0 && <p className="text-muted">No courses assigned yet.</p>}
            </div>
            <Link to="/teacher/my-subjects" className="card-link">
              View all courses
              <ArrowRight size={14} className="link-icon" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="content-card">
             <div className="card-header">
              <h2 className="card-title">
                <ClipboardList size={20} className="title-icon" />
                Quick Actions
              </h2>
            </div>
            <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              {[
                { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
                { to: "/teacher/grading", label: "Grading", icon: TrendingUp },
                { to: "/teacher/students", label: "Students", icon: Users },
                { to: "/teacher/schedule", label: "Schedule", icon: CalendarDays },
              ].map((action) => (
                <Link key={action.to} to={action.to} className="action-card" style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center' }}>
                  <action.icon size={24} style={{ margin: '0 auto 0.5rem' }} />
                  <div className="action-label" style={{ fontWeight: 600 }}>{action.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Footer */}
        <div className="recent-activity">
          <div className="activity-item">
            <CheckCircle size={16} className="activity-icon success" />
            <span className="activity-text">Connected to live backend</span>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Dashboard;