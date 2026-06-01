// src/App.jsx
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import SectionPage from "./pages/SectionPage";
import EditorDashboard from "./pages/EditorDashboard";
import LoginPage from "./pages/LoginPage";
import CreativeCorner from "./pages/CreativeCorner";
import MeetTheOfficers from "./pages/MeetTheOfficers";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App bg-[#F4FFE1] min-h-screen">
          <Navbar />

          <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/section/:section" element={<SectionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/creative" element={<CreativeCorner/>} />
            <Route path="/officers" element={<MeetTheOfficers />} />

            {/* Protected Editor Route */}
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <EditorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
                  Page Not Found
                </div>
              }
            />
          </Routes>
          <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;