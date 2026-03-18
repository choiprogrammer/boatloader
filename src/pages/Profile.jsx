import { useState, useRef } from 'react';
import { Camera, Edit3, Check, X, Package, Boxes, Star, Download } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useModpackStore } from '../store/modpackStore.js';
import { useUIStore } from '../store/uiStore.js';
import { ACHIEVEMENTS } from '../data/achievements.js';

export default function Profile() {
  const { user, updateProfile, updateAvatar, stats, unlockedAchievements } = useAuthStore();
  const { modpacks } = useModpackStore();
  const { addToast } = useUIStore();
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState('stats');
  const [form, setForm] = useState({ username: user?.username || '', bio: user?.bio || '', email: user?.email || '' });
  const fileRef = useRef();

  const totalMods = modpacks.reduce((sum, p) => sum + p.modIds.length, 0);
  const totalVotes = modpacks.reduce((sum, p) => sum + p.votes, 0);
  const points = unlockedAchievements.reduce((sum, id) => sum + (ACHIEVEMENTS.find(a => a.id === id)?.points || 0), 0);

  const handleSave = () => {
    updateProfile(form);
    addToast('Profile updated!', 'success');
    setEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { updateAvatar(ev.target.result); addToast('Avatar updated!', 'success'); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-fade">
      <h1 className="section-title" style={{ marginBottom:24 }}>👤 Profile</h1>

      {/* Profile card */}
      <div className="card" style={{ padding:28, marginBottom:20, display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ position:'relative' }}>
          <div style={{ width:80, height:80, borderRadius:'50%', border:'3px solid var(--accent)', background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, fontWeight:800, color:'#000', overflow:'hidden' }}>
            {user?.avatar ? <img src={user.avatar} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : (user?.username?.[0] || 'U').toUpperCase()}
          </div>
          <button onClick={() => fileRef.current?.click()} style={{ position:'absolute', bottom:0, right:0, width:26, height:26, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg-card)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Camera size={13} style={{ color:'#000' }} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleAvatarChange} />
        </div>
        <div style={{ flex:1 }}>
          {editing ? (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <input className="input" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="Username" style={{ maxWidth:240 }} />
              <input className="input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" style={{ maxWidth:280 }} />
              <textarea className="textarea" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Bio…" style={{ maxWidth:400, minHeight:60 }} />
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-primary btn-sm" onClick={handleSave}><Check size={13} /> Save</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}><X size={13} /> Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize:22, fontWeight:800 }}>{user?.username}</div>
              <div style={{ fontSize:14, color:'var(--text-muted)', margin:'4px 0 8px' }}>{user?.email}</div>
              <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:12 }}>{user?.bio || 'No bio yet.'}</div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <span className="badge badge-green">⭐ {points} pts</span>
                <span className="badge badge-blue">🏆 {unlockedAchievements.length} achievements</span>
                <span className="badge badge-gray">Joined {user?.joinDate || '2024'}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}><Edit3 size={12} /> Edit Profile</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom:20 }}>
        {['stats','achievements'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)} id={`tab-${t}`}>
            {t === 'stats' ? '📊 Statistics' : '🏆 Achievements'}
          </button>
        ))}
      </div>

      {tab === 'stats' && (
        <div>
          <div className="grid-4" style={{ marginBottom:20 }}>
            {[
              { label:'Total Mods Used', value:totalMods, icon:'📦' },
              { label:'Modpacks Created', value:modpacks.length, icon:'📂' },
              { label:'Community Votes', value:totalVotes, icon:'👍' },
              { label:'Achievement Points', value:points, icon:'⭐' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="card gradient-card" style={{ padding:18 }}>
                <div style={{ fontSize:28, fontWeight:900 }}>{value}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{icon} {label}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding:20 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>My Modpacks</div>
            {modpacks.length === 0 ? <div style={{ fontSize:13, color:'var(--text-muted)' }}>No modpacks yet.</div> : (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {modpacks.map(p => (
                  <div key={p.id} style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 14px', background:'var(--bg-secondary)', borderRadius:'var(--radius-md)' }}>
                    <span style={{ fontSize:22 }}>{p.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)' }}>{p.modIds.length} mods · {p.mcVersion}</div>
                    </div>
                    <span className="badge badge-gray">{p.privacy}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'achievements' && (
        <div>
          <div style={{ marginBottom:12, fontSize:13, color:'var(--text-secondary)' }}>
            {unlockedAchievements.length} of {ACHIEVEMENTS.length} unlocked · {points} total points
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {ACHIEVEMENTS.map(a => {
              const unlocked = unlockedAchievements.includes(a.id);
              return (
                <div key={a.id} className="card" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:14, opacity: unlocked ? 1 : 0.45 }}>
                  <div style={{ width:44, height:44, borderRadius:'var(--radius-md)', background: unlocked ? 'var(--accent-glow)' : 'var(--bg-tertiary)', border:`1px solid ${unlocked ? 'rgba(16,185,129,0.4)' : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700 }}>{a.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{a.desc}</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <span className={`badge ${unlocked ? 'badge-green' : 'badge-gray'}`}>{unlocked ? '✓ Unlocked' : 'Locked'}</span>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{a.points} pts</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
