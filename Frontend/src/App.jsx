import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Landing Page
import LandingPage from './pages/LandingPage';

// Student Pages
import StudentLogin from './pages/student/StudentLogin';
import StudentSignup from './pages/student/StudentSignup';
import Dashboard from './pages/student/StudentDashboard';
import ViewTokens from './pages/student/ViewTokens';
import BookMeal from './pages/student/BookMeal';
import ViewMenu from './pages/student/ViewMenu';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Student Protected Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="view-tokens"
            element={
              <ProtectedRoute>
                <ViewTokens />
              </ProtectedRoute>
            }
          />
          <Route
            path="book-meal"
            element={
              <ProtectedRoute>
                <BookMeal />
              </ProtectedRoute>
            }
          />
          <Route
            path="view-menu"
            element={
              <ProtectedRoute>
                <ViewMenu />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;