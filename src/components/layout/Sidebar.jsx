import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Boxes, CheckCircle, Compass, User, Settings, LogOut, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useUIStore } from '../../store/uiStore.js';
import { useAuthStore } from '../../store/authStore.js';
import { useModpackStore } from '../../store/modpackStore.js';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/mods', icon: Package, label: 'Mod Library' },
  { to: '/modpacks', icon: Boxes, label: 'My Modpacks' },
  { to: '/compatibility', icon: CheckCircle, label: 'Compatibility' },
  { to: '/explore', icon: Compass, label: 'Explore' },
];
const secondaryItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const { modpacks } = useModpackStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/auth'); };

  return (
    <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
      <NavLink to="/dashboard" className="sidebar-logo">
        <img src="/boat-icon.png" alt="BoatLoader logo" style={{ width:32, height:32, objectFit:'contain', flexShrink:0 }} />
        {!sidebarCollapsed && <span className="logo-text">Boat<span>Loader</span></span>}
      </NavLink>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {!sidebarCollapsed && <div className="nav-label">Navigation</div>}
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={18} />
              {!sidebarCollapsed && <span>{label}</span>}
              {!sidebarCollapsed && label === 'My Modpacks' && modpacks.length > 0 && (
                <span className="nav-badge">{modpacks.length}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="nav-section" style={{ marginTop: 8 }}>
          {!sidebarCollapsed && <div className="nav-label">Account</div>}
          {secondaryItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={18} />
              {!sidebarCollapsed && <span>{label}</span>}
            </NavLink>
          ))}
          <button className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)' }}>
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </nav>

      <button className="nav-item" onClick={toggleSidebar} style={{ margin: '8px', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        {sidebarCollapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
      </button>
    </aside>
  );
}
