// src/App.jsx
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import SectionPage from "./pages/SectionPage";
import EditorDashboard from "./pages/EditorDashboard";
import LoginPage from "./pages/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App bg-green-50/50 min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/section/:section" element={<SectionPage />} />
            <Route path="/login" element={<LoginPage />} />

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
        </div>
      </Router>
    );
  }
}

export default App;