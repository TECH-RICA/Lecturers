import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PublicNav from "@/components/PublicNav";
import { ArrowRight, BookOpen, Users, ClipboardList } from "lucide-react";
import "./styles/Home.css";

const Home = () => {
  return (
    <div className="index-container">
      <PublicNav />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
          >
            Your teaching,
            <span>beautifully organized.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hero-description"
          >
            Masomo lecturers is your digital staffroom — a calm, reliable
            space to manage classes, grade assignments, track students, and
            stay on top of your schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/login" className="btn-primary">
              <BookOpen size={16} />
              lecturer Portal
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-container">
          {[
            {
              icon: Users,
              title: "Student Management",
              description:
                "View your student roster, monitor attendance and performance, and keep track of every learner across all your classes.",
            },
            {
              icon: ClipboardList,
              title: "Assignments & Grading",
              description:
                "Create assignments, track submissions, input grades, and view grade distributions — all from one streamlined interface.",
            },
            {
              icon: BookOpen,
              title: "Class Organisation",
              description:
                "Manage your subjects, view your weekly timetable, and receive messages from students and the department in one place.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="feature-item"
            >
              <div className="feature-icon-wrapper">
                <feature.icon size={22} />
              </div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="index-footer">
        <div className="footer-container">
          <span className="footer-logo">Masomo lecturers</span>
          <span className="footer-copyright">© 2026 All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
