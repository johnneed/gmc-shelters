import React from "react";
import "./styles.css"; // You can create your own CSS file for styling

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <header className="top-menu">
        {/* Top menu content */}
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <aside className="sidebar">
        {/* Sidebar content */}
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="main-window">
        {/* Main content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
