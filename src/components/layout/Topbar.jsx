import { Search, Bell, Sun, Moon, Keyboard, Menu } from 'lucide-react';
import { useUIStore } from '../../store/uiStore.js';
import { useAuthStore } from '../../store/authStore.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { theme, toggleTheme, openSearch, toggleShortcuts, sidebarCollapsed } = useUIStore();
  const { user, notifications, markNotificationsRead } = useAuthStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  const handleNotifClick = () => {
    setShowNotifs(v => !v);
    if (!showNotifs) markNotificationsRead();
  };

  return (
    <header className={`topbar${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <button className="icon-btn" onClick={() => useUIStore.getState().toggleSidebar()} title="Toggle sidebar">
        <Menu size={16} />
      </button>

      <button className="topbar-search-btn" onClick={openSearch} id="global-search-btn">
        <Search size={14} />
        <span>Search mods, modpacks…</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: 4, color: 'var(--text-muted)' }}>Ctrl+K</span>
      </button>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        <div className="tooltip-wrap">
          <button className="icon-btn" onClick={toggleTheme} id="theme-toggle">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span className="tooltip-text">Toggle theme</span>
        </div>

        <div className="tooltip-wrap">
          <button className="icon-btn" onClick={toggleShortcuts} id="shortcuts-btn">
            <Keyboard size={16} />
          </button>
          <span className="tooltip-text">Shortcuts (?)</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={handleNotifClick} id="notifications-btn">
            <Bell size={16} />
            {unread > 0 && <span className="notif-dot" />}
          </button>
          {showNotifs && (
            <div className="glass" style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:300, borderRadius:'var(--radius-lg)', padding:8, zIndex:300, maxHeight:300, overflowY:'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding:'16px', textAlign:'center', color:'var(--text-muted)', fontSize:13 }}>No notifications</div>
              ) : notifications.map(n => (
                <div key={n.id} style={{ padding:'10px 12px', borderRadius:'var(--radius-md)', fontSize:13, color:'var(--text-secondary)' }}>{n.msg}</div>
              ))}
            </div>
          )}
        </div>

        <button className="avatar-btn" onClick={() => navigate('/profile')} id="profile-btn" title="Profile">
          {user?.avatar ? <img src={user.avatar} alt="avatar" /> : (user?.username?.[0] || 'U').toUpperCase()}
        </button>
      </div>
    </header>
  );
}
