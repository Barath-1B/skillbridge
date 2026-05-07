import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import store from './store/store';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AppShell from './components/layout/AppShell';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CareerBrief from './pages/CareerBrief';
import ProfileSetup from './pages/ProfileSetup';
import OceanQuiz from './pages/OceanQuiz';
import AnalyzerResults from './pages/AnalyzerResults';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import { RetakeTestsPage } from './features/retake-tests';
import { pageTransition } from './utils/motion';

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      className="min-h-[calc(100vh-4rem)]"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route
          path="/setup/profile"
          element={<ProtectedRoute element={<AnimatedPage><ProfileSetup /></AnimatedPage>} />}
        />
        <Route
          path="/setup/ocean"
          element={<ProtectedRoute element={<AnimatedPage><OceanQuiz /></AnimatedPage>} />}
        />
        <Route
          path="/analyze"
          element={<ProtectedRoute element={<AnimatedPage><AnalyzerResults /></AnimatedPage>} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<AnimatedPage><Dashboard /></AnimatedPage>} />}
        />
        <Route
          path="/career/:id"
          element={<ProtectedRoute element={<AnimatedPage><CareerBrief /></AnimatedPage>} />}
        />
        <Route
          path="/roadmap/:id"
          element={<ProtectedRoute element={<AnimatedPage><CareerBrief /></AnimatedPage>} />}
        />
        <Route
          path="/retake-tests"
          element={<ProtectedRoute element={<AnimatedPage><RetakeTestsPage /></AnimatedPage>} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<AnimatedPage><ProfilePage /></AnimatedPage>} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<AnimatedPage><SettingsPage /></AnimatedPage>} />}
        />
        <Route
          path="/settings/:tab"
          element={<ProtectedRoute element={<AnimatedPage><SettingsPage /></AnimatedPage>} />}
        />
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppShell>
              <AnimatedRoutes />
            </AppShell>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}
