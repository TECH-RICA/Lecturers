import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeacherLayout from "@/components/TeacherLayout";
import { 
  Search, 
  User,
  Mail,
  MailOpen
} from "lucide-react";
import "./styles/Messages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Using empty lists as placeholders
  const contacts: any[] = [];
  const messages: any[] = [];

  const unreadCount = 0;

  const filtered = contacts.filter(
    (m) =>
      m.from.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TeacherLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="messages-container"
      >
        <div className="messages-sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </div>
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="contacts-list">
            {filtered.length > 0 ? (
              filtered.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`contact-item ${selectedChat === contact.id ? 'active' : ''}`}
                  onClick={() => setSelectedChat(contact.id)}
                >
                  <div className="contact-avatar">
                    <User size={24} />
                  </div>
                  <div className="contact-info">
                    <div className="contact-top">
                      <h4>{contact.from}</h4>
                      <span>{contact.time}</span>
                    </div>
                    <p className="contact-subject">{contact.subject}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-contacts">
                <Mail size={40} />
                <p>No conversations found</p>
              </div>
            )}
          </div>
        </div>

        <div className="chat-window">
          {selectedChat ? (
            <>
              {/* Chat header and messages list would go here */}
            </>
          ) : (
            <div className="no-chat-selected">
              <MailOpen size={48} />
              <h3>Select a conversation</h3>
              <p>Choose a student to view your chat history and send messages.</p>
            </div>
          )}
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Messages;
