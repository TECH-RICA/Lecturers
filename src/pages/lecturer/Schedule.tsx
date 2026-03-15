import React, { useState } from "react";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import { CalendarDays, MapPin, Clock, BookOpen, ChevronLeft, ChevronRight, Plus, Users } from "lucide-react";
import "../styles/Schedule.css";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  // Using empty list as placeholder
  const schedule: any[] = [];
  const daySlots = schedule.filter((s) => s.day === selectedDay);

  const totalHours = 0;
  const totalClasses = 0;

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "lecture": return "#3b82f6";
      case "lab": return "#10b981";
      case "tutorial": return "#f59e0b";
      default: return "#6366f1";
    }
  };

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="schedule-container"
      >
        <div className="schedule-header">
          <div className="header-info">
            <h1>My Schedule</h1>
            <p>Manage your weekly teaching sessions and office hours.</p>
          </div>
          <button className="add-event-btn">
            <Plus size={18} />
            Add Event
          </button>
        </div>

        <div className="schedule-stats">
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{totalHours}h</span>
              <span className="stat-label">Weekly Hours</span>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{totalClasses}</span>
              <span className="stat-label">Total Classes</span>
            </div>
          </div>
        </div>

        <div className="day-selector">
          {days.map(day => (
            <button
              key={day}
              className={`day-tab ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule-grid">
          {daySlots.length > 0 ? (
            daySlots.map((slot) => (
              <div key={slot.id} className="schedule-card" style={{ borderLeftColor: getTypeColor(slot.type) }}>
                <div className="slot-time">
                  <Clock size={14} />
                  <span>{slot.time}</span>
                </div>
                <div className="slot-main">
                  <h3>{slot.title}</h3>
                  <div className="slot-meta">
                    <div className="meta-item">
                      <BookOpen size={14} />
                      <span>{slot.Unit}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={14} />
                      <span>{slot.room}</span>
                    </div>
                  </div>
                </div>
                <div className="slot-type" style={{ color: getTypeColor(slot.type), backgroundColor: `${getTypeColor(slot.type)}15` }}>
                  {slot.type}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <CalendarDays size={48} />
              <h3>No Sessions Scheduled</h3>
              <p>You don't have any classes scheduled for {selectedDay}.</p>
            </div>
          )}
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Schedule;
