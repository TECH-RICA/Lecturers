import React, { useState } from "react";
import { motion } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import {
  User,
  Mail,
  Phone,
  Book,
  Calendar,
  Camera,
  Edit2,
  MapPin,
  Award,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import "../styles/LecturerProfile.css";

const LecturerProfile = () => {
  const { user } = useAuth();
  const profile = {
    department: "Department of Computer Science",
    designation: "Senior Lecturer",
    bio: "Passionate educator with 10+ years of experience in software engineering and artificial intelligence.",
    specializations: ["Software Architecture", "Machine Learning", "Database Systems"],
    education: [
      { degree: "Ph.D. in Computer Science", university: "State University", year: "2015" },
      { degree: "M.Sc. in Software Engineering", university: "Tech Institute", year: "2010" }
    ]
  };
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    { icon: User, label: "Full Name", value: user?.full_name },
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: "N/A" },
    { icon: Book, label: "Department", value: profile.department },
    { icon: Award, label: "Title", value: profile.designation },
    { icon: MapPin, label: "Office", value: "N/A" },
  ];

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="profile-container"
      >
        <h1 className="profile-title">Profile</h1>

        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-image-section">
              <div className="profile-image-container">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user?.full_name}
                    className="profile-image"
                  />
                ) : (
                  <span className="profile-initials">
                    {(user?.full_name || "T")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <label htmlFor="profile-image" className="image-upload-button">
                <Camera />
              </label>
              <input
                type="file"
                id="profile-image"
                className="file-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="profile-name-section">
              <h2 className="profile-name">{user?.full_name}</h2>
              <p className="profile-admission">{user?.email}</p>
            </div>

            <button className="edit-profile-button">
              <Edit2 size={14} />
              Edit Profile
            </button>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            {fields.map((f) => (
              <div key={f.label} className="detail-item">
                <f.icon className="detail-icon" />
                <div className="detail-content">
                  <div className="detail-label">{f.label}</div>
                  <div className="detail-value">{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="additional-sections">
            <div className="info-section">
              <h3 className="section-title">
                <Book size={16} />
                Academic Information
              </h3>
              <div className="section-content">
                <p>Join Date: N/A</p>
                <p>Subjects: 4 (Current Semester)</p>
                <p>Total Students: 165</p>
              </div>
            </div>

            <div className="info-section">
              <h3 className="section-title">
                <Award size={16} />
                Qualifications
              </h3>
              <div className="section-content">
                <p>Ph.D. Computer Science — University of Nairobi</p>
                <p>M.Sc. Information Technology — Kenyatta University</p>
                <p>B.Sc. Computer Science — JKUAT</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default LecturerProfile;
