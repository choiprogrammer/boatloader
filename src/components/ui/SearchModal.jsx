import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Package, Boxes, Compass } from 'lucide-react';
import { useUIStore } from '../../store/uiStore.js';
import { MODS } from '../../data/mods.js';
import { useModpackStore } from '../../store/modpackStore.js';

export default function SearchModal() {
  const { searchOpen, closeSearch, searchHistory, addSearchHistory } = useUIStore();
  const { modpacks } = useModpackStore();
  const [q, setQ] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) { setQ(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!searchOpen) return null;

  const modResults = q.length > 1 ? MODS.filter(m =>
    m.name.toLowerCase().includes(q.toLowerCase()) || m.category.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5) : [];
  const packResults = q.length > 1 ? modpacks.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 3) : [];

  const goTo = (path, label) => {
    addSearchHistory(label);
    closeSearch();
    navigate(path);
  };

  const categoryIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };

  return (
    <div className="modal-overlay" onClick={closeSearch} style={{ alignItems: 'flex-start', paddingTop: '10vh' }}>
      <div className="modal" style={{ maxWidth: 580, maxHeight: '70vh' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search mods, modpacks, categories…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font)' }}
            id="search-modal-input"
          />
          {q && <button onClick={() => setQ('')} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={14} /></button>}
          <kbd style={{ fontSize: 11, padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: 4, color: 'var(--text-muted)', border: '1px solid var(--border)' }}>ESC</kbd>
        </div>
        <div style={{ overflowY: 'auto', maxHeight: '55vh', padding: 8 }}>
          {!q && searchHistory.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', padding: '8px 10px 4px' }}>Recent</div>
              {searchHistory.map((h, i) => (
                <button key={i} onClick={() => setQ(h)} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px', borderRadius:'var(--radius-md)', background:'none', border:'none', width:'100%', cursor:'pointer', color:'var(--text-secondary)', fontSize:13, textAlign:'left' }}>
                  <Clock size={14} style={{ color:'var(--text-muted)' }} />{h}
                </button>
              ))}
            </div>
          )}
          {!q && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', padding: '8px 10px 4px' }}>Quick Links</div>
              {[['Mod Library', '/mods', Package], ['My Modpacks', '/modpacks', Boxes], ['Explore', '/explore', Compass]].map(([label, path, Icon]) => (
                <button key={path} onClick={() => goTo(path, label)} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px', borderRadius:'var(--radius-md)', background:'none', border:'none', width:'100%', cursor:'pointer', color:'var(--text-secondary)', fontSize:13, textAlign:'left' }}>
                  <Icon size={14} style={{ color:'var(--accent)' }} />{label}
                </button>
              ))}
            </div>
          )}
          {modResults.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', padding: '8px 10px 4px' }}>Mods</div>
              {modResults.map(m => (
                <button key={m.id} onClick={() => goTo('/mods', m.name)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px', borderRadius:'var(--radius-md)', background:'none', border:'none', width:'100%', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontSize: 18, width: 28, textAlign:'center' }}>{categoryIcons[m.category] || '📦'}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.category} · by {m.author}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {packResults.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', padding: '8px 10px 4px' }}>Modpacks</div>
              {packResults.map(p => (
                <button key={p.id} onClick={() => goTo('/modpacks', p.name)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px', borderRadius:'var(--radius-md)', background:'none', border:'none', width:'100%', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontSize: 18, width: 28, textAlign:'center' }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.loader} · {p.mcVersion}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {q.length > 1 && modResults.length === 0 && packResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>No results for "{q}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
