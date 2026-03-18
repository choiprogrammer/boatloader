import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore.js';
import { useUIStore } from './store/uiStore.js';
import AppLayout from './components/layout/AppLayout.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ModLibrary from './pages/ModLibrary.jsx';
import ModpackManager from './pages/ModpackManager.jsx';
import CompatibilityChecker from './pages/CompatibilityChecker.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import NotFound from './pages/NotFound.jsx';
import ToastContainer from './components/ui/ToastContainer.jsx';
import SearchModal from './components/ui/SearchModal.jsx';
import ShortcutsOverlay from './components/ui/ShortcutsOverlay.jsx';

function ProtectedRoute({ children }) {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Landing />} />
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mods" element={<ModLibrary />} />
          <Route path="modpacks" element={<ModpackManager />} />
          <Route path="compatibility" element={<CompatibilityChecker />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <SearchModal />
      <ShortcutsOverlay />
    </>
  );
}
