import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import LecturerSidebar from "./LecturerSidebar";
import { Bell, Search, ChevronDown } from "lucide-react";
import "./styles/lecturerLayout.css";

interface lecturerLayoutProps {
  children: ReactNode;
}

const lecturerLayout = ({ children }: lecturerLayoutProps) => {
  const { isAuthenticated, user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="portal-layout lecturer-layout">
      <LecturerSidebar />
      <main className="portal-main lecturer-main">
        {/* Top Header */}
        <header className="lecturer-header">
          <div className="header-left">
            {!isMobile && (
              <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search students, assignments..."
                  className="search-input"
                />
              </div>
            )}
          </div>

          <div className="header-right">
            <div className="lecturer-profile">
              <div className="profile-avatar">
                {user?.name?.charAt(0) || "T"}
              </div>
              <div className="profile-details">
                <span className="profile-name">{user?.name || "lecturer"}</span>
                <span className="profile-email">
                  {user?.email || "lecturer@masomo.com"}
                </span>
              </div>
              <ChevronDown size={18} className="profile-chevron" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="content-wrapper lecturer-content">
          <div className="content-container lecturer-container">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default lecturerLayout;