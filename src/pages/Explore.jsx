import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ThumbsUp, ThumbsDown, ArrowRight, Star, Download } from 'lucide-react';
import { useModpackStore } from '../store/modpackStore.js';
import { MODS } from '../data/mods.js';
import { useUIStore } from '../store/uiStore.js';

const collections = [
  { id:1, title:'⚙️ Best Tech Packs of 2024', desc:'Automation and engineering at its finest', color:'linear-gradient(135deg,#10b981,#059669)', count:12 },
  { id:2, title:'🔮 Magic & Adventure Packs', desc:'Spells, dimensions, and epic boss battles', color:'linear-gradient(135deg,#8b5cf6,#6366f1)', count:8 },
  { id:3, title:'⚡ Lightweight Performance Builds', desc:'Maximum FPS with minimum mods', color:'linear-gradient(135deg,#f59e0b,#f97316)', count:6 },
  { id:4, title:'🌿 Vanilla+ Essentials', desc:'Improved vanilla without changing the feel', color:'linear-gradient(135deg,#22c55e,#16a34a)', count:15 },
];

const catIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };
function fmt(n) { return n >= 1e6 ? (n/1e6).toFixed(0)+'M' : n >= 1e3 ? (n/1e3).toFixed(0)+'K' : String(n); }

export default function Explore() {
  const { modpacks, voteModpack } = useModpackStore();
  const { addToast } = useUIStore();
  const [votedPacks, setVotedPacks] = useState({});
  const navigate = useNavigate();

  const newMods = MODS.filter(m => m.isNew);
  const featuredMods = MODS.filter(m => m.featured).slice(0, 8);
  const publicPacks = modpacks.filter(p => p.privacy === 'public');

  const handleVote = (id, dir) => {
    if (votedPacks[id]) return;
    voteModpack(id, dir);
    setVotedPacks(v => ({ ...v, [id]: dir }));
    addToast(dir > 0 ? '👍 Upvoted!' : '👎 Downvoted', 'info');
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <div>
          <h1 className="section-title">🧭 Explore</h1>
          <div className="section-sub">Discover curated collections and community modpacks</div>
        </div>
      </div>

      {/* Curated Collections */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontSize:16, fontWeight:700, marginBottom:14 }}>🗂️ Curated Collections</div>
        <div className="grid-2">
          {collections.map(col => (
            <div key={col.id} className="card" style={{ overflow:'hidden', cursor:'pointer' }} onClick={() => navigate('/mods')}>
              <div style={{ height:72, background:col.color, display:'flex', alignItems:'center', padding:'0 20px' }}>
                <div style={{ fontSize:18, fontWeight:800, color:'white' }}>{col.title}</div>
              </div>
              <div style={{ padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:13, color:'var(--text-secondary)' }}>{col.desc}</span>
                <span className="badge badge-gray">{col.count} packs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Mods */}
      {newMods.length > 0 && (
        <div style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div style={{ fontSize:16, fontWeight:700 }}>🆕 Just Added</div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mods')}>View all <ArrowRight size={13} /></button>
          </div>
          <div className="grid-auto-sm">
            {newMods.map(m => (
              <div key={m.id} className="card card-glow" style={{ padding:14, cursor:'pointer' }} onClick={() => navigate('/mods')}>
                <div style={{ display:'flex', gap:10, marginBottom:8, alignItems:'center' }}>
                  <div className="mod-icon" style={{ width:36, height:36, fontSize:16 }}>{catIcons[m.category] || '📦'}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700 }}>{m.name}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>by {m.author}</div>
                  </div>
                  <span className="badge badge-green" style={{ marginLeft:'auto', fontSize:10 }}>New</span>
                </div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginBottom:8, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{m.description}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {m.loaders.slice(0,2).map(l => <span key={l} style={{ fontSize:10, padding:'2px 6px', borderRadius:3, background:'var(--bg-secondary)', color:'var(--text-muted)', fontWeight:600 }}>{l}</span>)}
                  <span style={{ marginLeft:'auto', fontSize:11, color:'var(--text-muted)' }}>{fmt(m.downloads)} DL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Modpacks */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontSize:16, fontWeight:700, marginBottom:14 }}>🌍 Community Modpacks</div>
        {publicPacks.length === 0 ? (
          <div className="empty-state card" style={{ padding:40 }}>
            <div className="empty-icon">🌍</div>
            <div className="empty-title">No public modpacks yet</div>
            <div className="empty-sub">Create a modpack and set it to Public to share it here!</div>
            <button className="btn btn-primary btn-sm mt-3" onClick={() => navigate('/modpacks')}>Create & Share</button>
          </div>
        ) : (
          <div className="grid-3">
            {publicPacks.map(p => (
              <div key={p.id} className="modpack-card" onClick={() => navigate('/modpacks')}>
                <div className="modpack-banner" style={{ background:p.banner }}>{p.icon}</div>
                <div className="modpack-body">
                  <div className="modpack-name">{p.name}</div>
                  <div className="modpack-desc">{p.description}</div>
                  <div style={{ display:'flex', gap:8, marginBottom:10 }}>
                    <span className="badge badge-green" style={{ fontSize:10 }}>{p.loader}</span>
                    <span className="badge badge-blue" style={{ fontSize:10 }}>MC {p.mcVersion}</span>
                    <span className="badge badge-gray" style={{ fontSize:10 }}>{p.modIds.length} mods</span>
                  </div>
                  <div className="modpack-stats">
                    <span className="modpack-stat"><Download size={11} /> {p.downloads}</span>
                    <span className="modpack-stat">v{p.version}</span>
                    <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
                      <button onClick={e => { e.stopPropagation(); handleVote(p.id, 1); }} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3, fontSize:12, color: votedPacks[p.id] === 1 ? 'var(--accent)' : 'var(--text-muted)', fontWeight:600 }}>
                        <ThumbsUp size={13} /> {p.votes}
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleVote(p.id, -1); }} style={{ background:'none', border:'none', cursor:'pointer', color: votedPacks[p.id] === -1 ? 'var(--danger)' : 'var(--text-muted)' }}>
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured mods showcase */}
      <div>
        <div style={{ fontSize:16, fontWeight:700, marginBottom:14 }}>⭐ Editor's Picks</div>
        <div className="grid-4">
          {featuredMods.slice(0,4).map(m => (
            <div key={m.id} className="card card-glow" style={{ padding:14, cursor:'pointer' }} onClick={() => navigate('/mods')}>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:8 }}>
                <div className="mod-icon" style={{ width:36, height:36, fontSize:16 }}>{catIcons[m.category] || '📦'}</div>
                <div style={{ flex:1, overflow:'hidden' }}>
                  <div style={{ fontSize:13, fontWeight:700 }} className="truncate">{m.name}</div>
                  <div style={{ display:'flex', gap:2 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize:10, color: i <= Math.round(m.rating) ? '#fbbf24' : 'var(--border)' }}>★</span>)}
                  </div>
                </div>
              </div>
              <div style={{ fontSize:11, color:'var(--text-muted)', display:'flex', justifyContent:'space-between' }}>
                <span>{m.category}</span><span>{fmt(m.downloads)} DL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
