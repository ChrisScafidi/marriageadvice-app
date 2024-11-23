import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { UserProfileProvider } from './contexts/UserProfileContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PricingPage from './pages/PricingPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import IntakeForm from './components/auth/IntakeForm';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentPage from './pages/PaymentPage';
import SavedResourcesPage from './pages/SavedResourcesPage';
import DailyConnectionPage from './pages/DailyConnectionPage';
import ScheduleCheckInPage from './pages/ScheduleCheckInPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AITest from './components/AITest';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';

// Main app content wrapped with Router
function AppContent() {
  const { currentUser } = useAuth();
  const isChatPage = window.location.pathname === '/chat';
  const showNavbar = !isChatPage || window.innerWidth >= 768;

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/ai-test" element={<AITest />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <ProfileSettingsPage />
            </PrivateRoute>
          } />
          <Route path="/subscription" element={
            <PrivateRoute>
              <SubscriptionPage />
            </PrivateRoute>
          } />
          <Route path="/resources" element={
            <PrivateRoute>
              <SavedResourcesPage />
            </PrivateRoute>
          } />
          <Route path="/activities" element={
            <PrivateRoute>
              <DailyConnectionPage />
            </PrivateRoute>
          } />
          <Route path="/schedule" element={
            <PrivateRoute>
              <ScheduleCheckInPage />
            </PrivateRoute>
          } />
          <Route path="/intake" element={
            <PrivateRoute>
              <IntakeForm />
            </PrivateRoute>
          } />
          <Route path="/chat" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } />
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Root App component with all providers
const App = () => {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <SubscriptionProvider>
          <ThemeProvider>
            <Router>
              <AppContent />
            </Router>
          </ThemeProvider>
        </SubscriptionProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
};

export default App;