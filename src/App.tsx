import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Main Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import CreditsPage from "./pages/CreditsPage";

// User Pages
import SignUpPage from "./pages/user/SignUpPage.tsx";
import LoginPage from "./pages/user/LoginPage.tsx";
import VerifyEmailPage from "./pages/user/VerifyEmailPage.tsx";
import VerificationWaitingWrapper from "./pages/user/VerificationWaitingWrapper.tsx";
import UserDashboard from "./pages/user/UserDashboard.tsx";
import UserProfile from "./pages/user/UserProfile.tsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminRequests from "./pages/admin/AdminRequests.tsx";
import AdminRegistrations from "./pages/admin/AdminRegistrations.tsx";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Main Website Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/credits" element={<CreditsPage />} />

            {/* User Routes */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route
              path="/verify-waiting"
              element={<VerificationWaitingWrapper />}
            />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<UserProfile />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route
              path="/admin/registrations"
              element={<AdminRegistrations />}
            />
          </Routes>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
