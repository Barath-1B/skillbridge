import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './store/store';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CareerBrief from './pages/CareerBrief';
import ProfileSetup from './pages/ProfileSetup';
import OceanQuiz from './pages/OceanQuiz';
import AnalyzerResults from './pages/AnalyzerResults';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup/profile" element={<ProtectedRoute element={<ProfileSetup />} />} />
            <Route path="/setup/ocean" element={<ProtectedRoute element={<OceanQuiz />} />} />
            <Route path="/analyze" element={<ProtectedRoute element={<AnalyzerResults />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/career/:id" element={<ProtectedRoute element={<CareerBrief />} />} />
            <Route path="/roadmap/:id" element={<ProtectedRoute element={<CareerBrief />} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
