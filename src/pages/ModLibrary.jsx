import { useState, useMemo } from 'react';
import { Search, Grid, List, Star, Download, Heart, Plus, X, Filter, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { useModsStore } from '../store/modsStore.js';
import { useModpackStore } from '../store/modpackStore.js';
import { useUIStore } from '../store/uiStore.js';
import { useAuthStore } from '../store/authStore.js';
import { CATEGORIES, MC_VERSIONS, LOADERS, TAGS } from '../data/mods.js';

function formatDownloads(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(0) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
  return String(n);
}

const catIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };

function StarRating({ modId, rating }) {
  const { ratings, rateMod } = useModsStore();
  const { incrementStat } = useAuthStore();
  const myRating = ratings[modId] || 0;
  return (
    <div className="stars" onClick={e => e.stopPropagation()}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`star${i <= (myRating || rating) ? ' filled' : ''}`} viewBox="0 0 24 24" fill={i <= (myRating || rating) ? '#fbbf24' : 'none'} stroke={i <= (myRating || rating) ? '#fbbf24' : 'currentColor'} strokeWidth={2}
          onClick={() => { rateMod(modId, i); incrementStat('ratings'); }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ModDetailModal({ mod, onClose, onAdd }) {
  const { modpacks, activeModpackId } = useModpackStore();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-scale" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div className="mod-icon" style={{ width:48, height:48, fontSize:24 }}>{catIcons[mod.category] || '📦'}</div>
            <div>
              <div className="modal-title">{mod.name}</div>
              <div style={{ fontSize:12, color:'var(--text-muted)' }}>by {mod.author} · {mod.license}</div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body" style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.7 }}>{mod.description}</div>

          <div className="grid-2" style={{ gap:12 }}>
            {[
              ['Category', mod.category],
              ['Loaders', mod.loaders.join(', ')],
              ['MC Versions', mod.mcVersions.slice(0,3).join(', ')],
              ['Downloads', formatDownloads(mod.downloads)],
              ['Size', mod.size],
              ['Last Updated', mod.lastUpdated],
            ].map(([k,v]) => (
              <div key={k} style={{ background:'var(--bg-secondary)', borderRadius:'var(--radius-sm)', padding:'10px 14px' }}>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:2 }}>{k}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:8 }}>TAGS</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {mod.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {mod.dependencies.length > 0 && (
            <div style={{ padding:'12px 14px', background:'rgba(245,158,11,0.1)', borderRadius:'var(--radius-md)', border:'1px solid rgba(245,158,11,0.3)', fontSize:13, color:'var(--warning)' }}>
              ⚠️ Requires: {mod.dependencies.join(', ')}
            </div>
          )}
          {mod.incompatibleWith.length > 0 && (
            <div style={{ padding:'12px 14px', background:'rgba(239,68,68,0.1)', borderRadius:'var(--radius-md)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'var(--danger)' }}>
              ❌ Incompatible with: {mod.incompatibleWith.join(', ')}
            </div>
          )}

          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:4 }}>YOUR RATING</div>
            <StarRating modId={mod.id} rating={mod.rating} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          {modpacks.length > 0 && (
            <button className="btn btn-primary" onClick={() => { onAdd(mod); onClose(); }} id="add-to-modpack-btn">
              <Plus size={14} /> Add to Active Modpack
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ModLibrary() {
  const { filters, sortBy, viewMode, page, perPage, setFilter, setSortBy, setViewMode, setPage, toggleTag, toggleFavorite, favorites, getFilteredMods } = useModsStore();
  const { modpacks, activeModpackId, addModToModpack } = useModpackStore();
  const { addToast } = useUIStore();
  const [selectedMod, setSelectedMod] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = getFilteredMods();
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);
  const activeMP = modpacks.find(p => p.id === activeModpackId);

  const handleAddMod = (mod) => {
    if (!activeModpackId) { addToast('Select an active modpack first in My Modpacks', 'warning'); return; }
    addModToModpack(activeModpackId, mod.id);
    addToast(`${mod.name} added to "${activeMP?.name}"`, 'success');
  };

  const loaderColors = { forge:'#f59e0b', fabric:'#22c55e', neoforge:'#f97316', quilt:'#a78bfa' };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <div>
          <h1 className="section-title">📦 Mod Library</h1>
          <div className="section-sub">{filtered.length} mods available</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowFilters(v => !v)}>
            <SlidersHorizontal size={13} /> {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button className={`icon-btn${viewMode === 'grid' ? ' active' : ''}`}  onClick={() => setViewMode('grid')} title="Grid view"><Grid size={15} /></button>
          <button className={`icon-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')} title="List view"><List size={15} /></button>
        </div>
      </div>

      {/* Tags bar */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
        {TAGS.slice(0,16).map(t => (
          <button key={t} className={`tag${filters.tags.includes(t) ? ' active' : ''}`} onClick={() => toggleTag(t)}>{t}</button>
        ))}
      </div>

      <div style={{ display:'flex', gap:20 }}>
        {/* Filters sidebar */}
        {showFilters && (
          <div style={{ width:220, flexShrink:0 }}>
            <div className="card" style={{ padding:16, display:'flex', flexDirection:'column', gap:14 }}>
              <div>
                <div className="form-label" style={{ marginBottom:6 }}>Search</div>
                <div className="input-group">
                  <Search size={14} className="input-icon" />
                  <input className="input" placeholder="Filter mods…" value={filters.search}
                    onChange={e => setFilter('search', e.target.value)} id="mod-search-input" />
                </div>
              </div>
              <div>
                <div className="form-label" style={{ marginBottom:6 }}>Category</div>
                <select className="select" value={filters.category} onChange={e => setFilter('category', e.target.value)} id="filter-category">
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div className="form-label" style={{ marginBottom:6 }}>Mod Loader</div>
                <select className="select" value={filters.loader} onChange={e => setFilter('loader', e.target.value)} id="filter-loader">
                  <option value="all">All Loaders</option>
                  {LOADERS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase()+l.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <div className="form-label" style={{ marginBottom:6 }}>MC Version</div>
                <select className="select" value={filters.mcVersion} onChange={e => setFilter('mcVersion', e.target.value)} id="filter-version">
                  <option value="all">All Versions</option>
                  {MC_VERSIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <div className="form-label" style={{ marginBottom:6 }}>Sort By</div>
                <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)} id="sort-select">
                  <option value="downloads">Downloads</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name A–Z</option>
                  <option value="updated">Recently Updated</option>
                </select>
              </div>
              {(filters.category !== 'all' || filters.loader !== 'all' || filters.mcVersion !== 'all' || filters.search || filters.tags.length) ? (
                <button className="btn btn-secondary btn-sm" onClick={() => useModsStore.getState().clearFilters()}>
                  <X size={12} /> Clear Filters
                </button>
              ) : null}
            </div>
          </div>
        )}

        {/* Main grid */}
        <div style={{ flex:1, minWidth:0 }}>
          {paginated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No mods found</div>
              <div className="empty-sub">Try adjusting your filters or search term.</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid-auto">
              {paginated.map(mod => (
                <div key={mod.id} className="mod-card" onClick={() => setSelectedMod(mod)}>
                  <div className="mod-card-glow" />
                  <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                    <div className="mod-icon">{catIcons[mod.category] || '📦'}</div>
                    <div style={{ flex:1, overflow:'hidden' }}>
                      <div className="mod-name truncate">{mod.name}</div>
                      <div className="mod-author">by {mod.author}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleFavorite(mod.id); }} style={{ background:'none', border:'none', cursor:'pointer', color: favorites.includes(mod.id) ? '#f43f5e' : 'var(--text-muted)', padding:2 }}>
                      <Heart size={14} fill={favorites.includes(mod.id) ? '#f43f5e' : 'none'} />
                    </button>
                  </div>
                  <div className="mod-desc">{mod.description}</div>
                  <div className="mod-meta">
                    <span className="badge badge-gray">{mod.category}</span>
                    {mod.isNew && <span className="badge badge-green">New</span>}
                    {mod.featured && <span className="badge badge-purple">Featured</span>}
                  </div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {mod.loaders.map(l => <span key={l} style={{ fontSize:10, padding:'2px 6px', borderRadius:4, background:'rgba(255,255,255,0.06)', color: loaderColors[l] || 'var(--text-muted)', fontWeight:600 }}>{l}</span>)}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
                    <StarRating modId={mod.id} rating={mod.rating} />
                    <span className="mod-downloads"><Download size={11} /> {formatDownloads(mod.downloads)}</span>
                  </div>
                  <div className="mod-actions">
                    <button className="btn btn-primary btn-sm w-full" onClick={e => { e.stopPropagation(); handleAddMod(mod); }} id={`add-mod-${mod.id}`} style={{ justifyContent:'center' }}>
                      <Plus size={13} /> Add to Pack
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {paginated.map(mod => (
                <div key={mod.id} className="card" style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer', transition:'var(--transition)' }} onClick={() => setSelectedMod(mod)}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}>
                  <div className="mod-icon" style={{ width:40, height:40, fontSize:18 }}>{catIcons[mod.category] || '📦'}</div>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ fontSize:14, fontWeight:700 }} className="truncate">{mod.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>by {mod.author} · {mod.category}</div>
                  </div>
                  <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
                    <StarRating modId={mod.id} rating={mod.rating} />
                    <span style={{ fontSize:12, color:'var(--text-muted)', minWidth:60, textAlign:'right' }}>{formatDownloads(mod.downloads)} DL</span>
                    <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); handleAddMod(mod); }}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:24 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setPage(Math.max(1, page-1))} disabled={page === 1}>←</button>
              {Array.from({length: Math.min(7, totalPages)}, (_,i) => {
                const p = totalPages <= 7 ? i+1 : page <= 4 ? i+1 : page >= totalPages-3 ? totalPages-6+i : page-3+i;
                return (
                  <button key={p} className={`btn btn-sm${page === p ? ' btn-primary' : ' btn-secondary'}`} onClick={() => setPage(p)}>{p}</button>
                );
              })}
              <button className="btn btn-secondary btn-sm" onClick={() => setPage(Math.min(totalPages, page+1))} disabled={page === totalPages}>→</button>
            </div>
          )}
        </div>
      </div>

      {selectedMod && <ModDetailModal mod={selectedMod} onClose={() => setSelectedMod(null)} onAdd={handleAddMod} />}
    </div>
  );
}
