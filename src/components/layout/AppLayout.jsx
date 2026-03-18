import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import { useUIStore } from '../../store/uiStore.js';
import { useEffect } from 'react';

export default function AppLayout() {
  const { sidebarCollapsed } = useUIStore();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useUIStore.getState().openSearch();
      }
      if (e.key === '?' && !e.target.closest('input,textarea')) {
        useUIStore.getState().toggleShortcuts();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Topbar />
        <div className="page-inner animate-fade">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
