import { useState } from 'react';
import { useUIStore } from '../store/uiStore.js';
import { useAuthStore } from '../store/authStore.js';
import { useModpackStore } from '../store/modpackStore.js';
import { Sun, Moon, Type, Contrast, Download, Upload, Trash2, Bell, Globe, Eye } from 'lucide-react';

const langs = ['English 🇺🇸','Español 🇪🇸','Français 🇫🇷','Deutsch 🇩🇪','Português 🇧🇷','中文 🇨🇳'];

export default function Settings() {
  const { theme, toggleTheme } = useUIStore();
  const { user, updateProfile, addToast: _ } = useAuthStore();
  const { modpacks } = useModpackStore();
  const { addToast } = useUIStore();
  const [fontSize, setFontSize] = useState(14);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [lang, setLang] = useState('English 🇺🇸');
  const [notifs, setNotifs] = useState({ modUpdates: true, newPacks: true, compatibility: true });
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' });
  const [confirmClear, setConfirmClear] = useState(false);

  const handleExportData = () => {
    const data = { user, modpacks };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'modforge-export.json'; a.click();
    addToast('Data exported!', 'success');
  };

  const handleChangePw = () => {
    if (!pw.current) { addToast('Enter current password', 'error'); return; }
    if (pw.newPw.length < 6) { addToast('New password too short', 'error'); return; }
    if (pw.newPw !== pw.confirm) { addToast('Passwords do not match', 'error'); return; }
    addToast('Password changed successfully!', 'success');
    setPw({ current: '', newPw: '', confirm: '' });
  };

  const applyFontSize = (size) => {
    setFontSize(size);
    document.documentElement.style.fontSize = size + 'px';
  };

  return (
    <div className="animate-fade">
      <h1 className="section-title" style={{ marginBottom:24 }}>⚙️ Settings</h1>

      <div style={{ display:'flex', flexDirection:'column', gap:16, maxWidth:700 }}>

        {/* Appearance */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:18 }}>🎨 Appearance</div>
          <div className="form-group" style={{ marginBottom:14 }}>
            <label className="form-label">Theme</label>
            <div style={{ display:'flex', gap:10 }}>
              {['dark','light'].map(t => (
                <button key={t} className={`btn ${theme === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { if (theme !== t) toggleTheme(); }} id={`theme-${t}`}>
                  {t === 'dark' ? <><Moon size={14} /> Dark</> : <><Sun size={14} /> Light</>}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom:14 }}>
            <label className="form-label">Font Size: {fontSize}px</label>
            <input type="range" min={12} max={20} step={1} value={fontSize} onChange={e => applyFontSize(Number(e.target.value))}
              style={{ width:'100%', maxWidth:280, accentColor:'var(--accent)' }} id="font-size-slider" />
            <div style={{ fontSize:11, color:'var(--text-muted)', display:'flex', justifyContent:'space-between', maxWidth:280 }}><span>Small (12px)</span><span>Large (20px)</span></div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { key:'reducedMotion', state:reducedMotion, set:setReducedMotion, label:'Reduced Motion', desc:'Disable animations for better accessibility', icon:<Eye size={14} /> },
              { key:'highContrast', state:highContrast, set:setHighContrast, label:'High Contrast', desc:'Increases contrast for better readability', icon:<Contrast size={14} /> },
            ].map(({ key, state, set, label, desc, icon }) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>{icon} {label}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{desc}</div>
                </div>
                <label style={{ position:'relative', display:'inline-flex', alignItems:'center', cursor:'pointer' }}>
                  <input type="checkbox" checked={state} onChange={e => set(e.target.checked)} style={{ opacity:0, width:0, height:0 }} id={`toggle-${key}`} />
                  <div style={{ width:36, height:20, borderRadius:99, background: state ? 'var(--accent)' : 'var(--bg-tertiary)', border:'1px solid var(--border)', transition:'var(--transition)', position:'relative' }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', background:'white', position:'absolute', top:2, left: state ? 18 : 2, transition:'var(--transition)' }} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:14 }}>🌍 Language</div>
          <div className="form-group">
            <label className="form-label">Display Language</label>
            <select className="select" value={lang} onChange={e => { setLang(e.target.value); addToast('Language preference saved (UI demo only)', 'info'); }} style={{ maxWidth:280 }} id="lang-select">
              {langs.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:14 }}>🔔 Notifications</div>
          {Object.entries(notifs).map(([key, val]) => {
            const labels = { modUpdates:'Mod Update Alerts', newPacks:'New Community Packs', compatibility:'Compatibility Warnings' };
            return (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:13 }}><Bell size={13} style={{ display:'inline', marginRight:6, color:'var(--text-muted)' }} />{labels[key]}</span>
                <label style={{ position:'relative', display:'inline-flex', alignItems:'center', cursor:'pointer' }}>
                  <input type="checkbox" checked={val} onChange={e => setNotifs(n => ({ ...n, [key]: e.target.checked }))} style={{ opacity:0, width:0, height:0 }} />
                  <div style={{ width:36, height:20, borderRadius:99, background: val ? 'var(--accent)' : 'var(--bg-tertiary)', border:'1px solid var(--border)', transition:'var(--transition)', position:'relative' }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', background:'white', position:'absolute', top:2, left: val ? 18 : 2, transition:'var(--transition)' }} />
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        {/* Security */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:18 }}>🔒 Security</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:340 }}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input className="input" type="password" placeholder="••••••••" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input className="input" type="password" placeholder="••••••••" value={pw.newPw} onChange={e => setPw(p => ({ ...p, newPw: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input className="input" type="password" placeholder="••••••••" value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} />
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleChangePw} style={{ alignSelf:'flex-start' }}>Update Password</button>
          </div>
        </div>

        {/* Data */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:18 }}>💾 Data Management</div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button className="btn btn-secondary" onClick={handleExportData}><Download size={14} /> Export My Data</button>
            <button className="btn btn-secondary" onClick={() => addToast('Import feature: upload a JSON file exported from BoatLoader', 'info')}><Upload size={14} /> Import Data</button>
            {!confirmClear ? (
              <button className="btn btn-danger" onClick={() => setConfirmClear(true)}><Trash2 size={14} /> Clear All Data</button>
            ) : (
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:13, color:'var(--danger)' }}>Are you sure?</span>
                <button className="btn btn-danger btn-sm" onClick={() => { localStorage.clear(); window.location.reload(); }}>Yes, Clear</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setConfirmClear(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
