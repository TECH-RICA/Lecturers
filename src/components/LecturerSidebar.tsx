import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Award,
  CalendarDays,
  MessageSquare,     
  User,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  ChevronDown
} from "lucide-react";
import "./styles/lecturerLayout.css";

const lecturerLinks = [
  { to: "/lecturer", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/lecturer/subjects", icon: BookOpen, label: "My Subjects" },
  { to: "/lecturer/students", icon: Users, label: "Students" },
  { to: "/lecturer/assignments", icon: ClipboardList, label: "Assignments" },
  { to: "/lecturer/grading", icon: Award, label: "Grading" },
  { to: "/lecturer/schedule", icon: CalendarDays, label: "Schedule" },
  { to: "/lecturer/messages", icon: MessageSquare, label: "Messages" },
  { to: "/lecturer/profile", icon: User, label: "Profile" },
];

const LecturerSidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="mobile-menu-toggle lecturer-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleMobileMenu}
        />
      )}

      <aside 
        className={`portal-sidebar lecturer-sidebar ${isMobile ? 'mobile' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <div className="sidebar-header">
          <div className="header-logo">
            <Home className="header-icon" />
            <span className="header-title">MASOMO</span>
          </div>
          {!isMobile && (
            <div className="lecturer-badge">
              <span className="badge-text">lecturer</span>
            </div>
          )}
        </div>

        {!isMobile && user && (
          <div className="lecturer-profile-mini">
            <div className="profile-avatar">
              {user?.name?.charAt(0) || 'T'}
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.name || 'lecturer'}</span>
              <span className="profile-role">Educator</span>
            </div>
            <ChevronDown size={16} className="profile-dropdown" />
          </div>
        )}

        <nav className="sidebar-nav">
          {lecturerLinks.map((link) => {
            const isActive = pathname === link.to || pathname.startsWith(link.to + '/');
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                <link.icon className="nav-icon" />
                <span className="nav-label">{link.label}</span>
                {link.label === "Messages" && (
                  <span className="nav-badge">3</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            <LogOut className="logout-icon" />
            <span className="logout-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default LecturerSidebar;