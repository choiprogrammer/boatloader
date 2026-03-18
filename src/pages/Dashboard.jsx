import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Boxes, Download, TrendingUp, Star, Clock, ArrowRight, BarChart2, Zap, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useModpackStore } from '../store/modpackStore.js';
import { MODS } from '../data/mods.js';
import { ACHIEVEMENTS } from '../data/achievements.js';

function AnimatedCount({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = typeof value === 'number' ? value : 0;
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(target / 40);
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(start);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

const tips = [
  '💡 Use Ctrl+K to instantly search mods and modpacks from anywhere.',
  '⚡ The compatibility checker can auto-detect missing dependencies.',
  '🔗 You can share modpacks via a generated QR code.',
  '⚙️ Export your modpack to CurseForge, Modrinth, or MultiMC format.',
  '🌙 Press T from any page to toggle between dark and light mode... just kidding, use the top bar 😄',
];

export default function Dashboard() {
  const { user, stats, unlockedAchievements } = useAuthStore();
  const { modpacks, activityLog, voteModpack } = useModpackStore();
  const navigate = useNavigate();
  const [tip] = useState(tips[Math.floor(Math.random() * tips.length)]);

  const trending = MODS.filter(m => m.trending).slice(0, 5);
  const featured = MODS.filter(m => m.featured).slice(0, 4);
  const recent = [...modpacks].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 4);

  const statCards = [
    { label: 'Total Mods', value: MODS.length, icon: Package, color: 'var(--accent)' },
    { label: 'My Modpacks', value: modpacks.length, icon: Boxes, color: '#6366f1' },
    { label: 'Achievements', value: unlockedAchievements.length, icon: Star, color: '#f59e0b' },
    { label: 'Activity', value: activityLog.length, icon: BarChart2, color: '#3b82f6' },
  ];

  return (
    <div className="animate-fade">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>
          Welcome back, <span className="gradient-text">{user?.username || 'Crafter'}</span> 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>Here's what's happening with your modpacks.</p>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800 }}><AnimatedCount value={value} /></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 28 }}>
        {/* Recent Modpacks */}
        <div className="card" style={{ padding: 20 }}>
          <div className="flex-between mb-4">
            <div className="font-bold">Recent Modpacks</div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/modpacks')}>View all <ArrowRight size={13} /></button>
          </div>
          {recent.length === 0 ? (
            <div className="empty-state" style={{ padding: 32 }}>
              <div className="empty-icon">📦</div>
              <div className="empty-sub">No modpacks yet. Create your first one!</div>
              <button className="btn btn-primary btn-sm mt-3" onClick={() => navigate('/modpacks')}>Create Modpack</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recent.map(p => (
                <div key={p.id} onClick={() => navigate('/modpacks')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }} className="truncate">{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.modIds.length} mods · {p.loader} · {p.mcVersion}</div>
                  </div>
                  <span className={`badge ${p.privacy === 'public' ? 'badge-green' : 'badge-gray'}`}>{p.privacy}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="card" style={{ padding: 20 }}>
          <div className="font-bold mb-4">Recent Activity</div>
          {activityLog.length === 0 ? (
            <div className="empty-state" style={{ padding: 32 }}>
              <div className="empty-icon">📋</div>
              <div className="empty-sub">No activity yet. Start managing modpacks!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activityLog.slice(0, 6).map(log => (
                <div key={log.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{log.action}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(log.time).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 28 }}>
        {/* Trending Mods */}
        <div className="card" style={{ padding: 20 }}>
          <div className="flex-between mb-4">
            <div className="font-bold"><TrendingUp size={16} style={{ display:'inline', marginRight:6, color:'var(--accent)' }} />Trending Mods</div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mods')}>Browse <ArrowRight size={13} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {trending.map((m, i) => (
              <div key={m.id} onClick={() => navigate('/mods')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-muted)', width: 18, textAlign: 'center' }}>#{i+1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.category}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600 }}>↑{(m.downloads/1e6).toFixed(0)}M</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions + tip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="font-bold mb-3">Quick Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Browse Mods', icon: '📦', path: '/mods' },
                { label: 'New Modpack', icon: '➕', path: '/modpacks' },
                { label: 'Check Compat', icon: '✅', path: '/compatibility' },
                { label: 'Explore', icon: '🧭', path: '/explore' },
              ].map(q => (
                <button key={q.label} className="btn btn-secondary" onClick={() => navigate(q.path)} style={{ justifyContent: 'flex-start', gap: 8, fontSize: 12 }}>
                  <span>{q.icon}</span>{q.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card gradient-card" style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 6, display:'flex', alignItems:'center', gap:6 }}>
              <Zap size={14} /> PRO TIP
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip}</p>
          </div>
        </div>
      </div>

      {/* Featured Mods */}
      <div className="mb-4">
        <div className="flex-between mb-3">
          <div className="font-bold" style={{ fontSize: 16 }}>⭐ Featured Mods</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mods')}>See all <ArrowRight size={13} /></button>
        </div>
        <div className="grid-4">
          {featured.map(m => {
            const catIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };
            return (
              <div key={m.id} className="card card-glow" style={{ padding: 16, cursor: 'pointer' }} onClick={() => navigate('/mods')}>
                <div style={{ display:'flex', gap:12 }}>
                  <div className="mod-icon" style={{ width: 40, height: 40, fontSize: 18 }}>{catIcons[m.category] || '📦'}</div>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ fontSize:13, fontWeight:700 }} className="truncate">{m.name}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>by {m.author}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:8, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{m.description}</div>
                <div style={{ marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span className="badge badge-green">{m.category}</span>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>{(m.downloads/1e6).toFixed(0)}M DL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="card" style={{ padding: 20 }}>
        <div className="font-bold mb-4">🏆 Achievements <span style={{ fontSize:13, fontWeight:400, color:'var(--text-muted)' }}>({unlockedAchievements.length}/{ACHIEVEMENTS.length})</span></div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {ACHIEVEMENTS.map(a => {
            const unlocked = unlockedAchievements.includes(a.id);
            return (
              <div key={a.id} className="tooltip-wrap">
                <div style={{ width:44, height:44, borderRadius:'var(--radius-md)', background: unlocked ? 'var(--accent-glow)' : 'var(--bg-secondary)', border: `1px solid ${unlocked ? 'rgba(16,185,129,0.4)' : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, opacity: unlocked ? 1 : 0.35, transition:'var(--transition)', cursor:'default' }}>
                  {a.icon}
                </div>
                <span className="tooltip-text">{a.name}: {a.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
