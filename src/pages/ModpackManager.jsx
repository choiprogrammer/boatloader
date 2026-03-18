import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Copy, Download, Share2, Lock, Globe, EyeOff, Edit3, GripVertical, Undo2, Redo2, HistoryIcon, BarChart2, ChevronDown, Check, X } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useModpackStore } from '../store/modpackStore.js';
import { useUIStore } from '../store/uiStore.js';
import { useAuthStore } from '../store/authStore.js';
import { MODS } from '../data/mods.js';
import confetti from 'canvas-confetti';

const privacyIcons = { public: Globe, private: Lock, unlisted: EyeOff };

function SortableMod({ modId, onRemove }) {
  const mod = MODS.find(m => m.id === modId);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: modId });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  if (!mod) return null;
  const catIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };
  return (
    <div ref={setNodeRef} style={{ ...style, display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'var(--bg-secondary)', borderRadius:'var(--radius-md)', marginBottom:6, border:'1px solid var(--border)' }}>
      <button className="drag-handle" {...attributes} {...listeners} style={{ background:'none', border:'none', padding:2, cursor:'grab', color:'var(--text-muted)', opacity:0.6 }}>
        <GripVertical size={16} />
      </button>
      <span style={{ fontSize:16 }}>{catIcons[mod.category] || '📦'}</span>
      <div style={{ flex:1, overflow:'hidden' }}>
        <div style={{ fontSize:13, fontWeight:600 }} className="truncate">{mod.name}</div>
        <div style={{ fontSize:11, color:'var(--text-muted)' }}>{mod.category} · {mod.size}</div>
      </div>
      <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
        {mod.loaders.slice(0,2).map(l => <span key={l} style={{ fontSize:10, padding:'2px 5px', borderRadius:3, background:'var(--bg-tertiary)', color:'var(--text-muted)', fontWeight:600 }}>{l}</span>)}
      </div>
      <button onClick={() => onRemove(modId)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:4, borderRadius:4, transition:'var(--transition)' }}
        onMouseEnter={e => e.currentTarget.style.color='var(--danger)'}
        onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
        <X size={14} />
      </button>
    </div>
  );
}

function CreateModal({ onClose }) {
  const { createModpack } = useModpackStore();
  const { addToast, completeOnboarding } = useUIStore();
  const { unlockAchievement, incrementStat } = useAuthStore();
  const [form, setForm] = useState({ name:'', description:'', icon:'⚙️', loader:'forge', mcVersion:'1.20.1', privacy:'private', banner:'#10b981' });
  const icons = ['⚙️','🔮','🌿','🏡','⚔️','🐉','🌋','🚀','🎮','💎','🌍','🔥'];
  const colors = ['#10b981','#6366f1','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6'];

  const handleCreate = () => {
    if (!form.name.trim()) { addToast('Modpack name is required', 'error'); return; }
    createModpack(form);
    const isFirst = unlockAchievement('first-pack');
    if (isFirst) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#10b981','#6366f1','#fbbf24'] });
      addToast('🎉 Achievement unlocked: Pack Pioneer!', 'success');
    }
    incrementStat('modpacksCreated');
    addToast(`✨ "${form.name}" created!`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-scale" style={{ maxWidth:500 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Create New Modpack</span>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body" style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Icon picker */}
          <div>
            <div className="form-label" style={{ marginBottom:8 }}>Icon</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {icons.map(ic => (
                <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))} style={{ width:40, height:40, borderRadius:'var(--radius-md)', fontSize:20, background: form.icon === ic ? 'var(--accent-glow)' : 'var(--bg-secondary)', border:`1px solid ${form.icon === ic ? 'var(--accent)' : 'var(--border)'}`, cursor:'pointer', transition:'var(--transition)' }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
          {/* Banner color */}
          <div>
            <div className="form-label" style={{ marginBottom:8 }}>Banner Color</div>
            <div style={{ display:'flex', gap:6 }}>
              {colors.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, banner: c }))} style={{ width:28, height:28, borderRadius:'50%', background:c, border: form.banner === c ? '2px solid white' : '2px solid transparent', cursor:'pointer', outline: form.banner === c ? `2px solid ${c}` : 'none', outlineOffset:2 }} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input className="input" placeholder="My Awesome Pack" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} id="pack-name-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="textarea" placeholder="A brief description…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Mod Loader</label>
              <select className="select" value={form.loader} onChange={e => setForm(f => ({ ...f, loader: e.target.value }))}>
                <option value="forge">Forge</option>
                <option value="fabric">Fabric</option>
                <option value="neoforge">NeoForge</option>
                <option value="quilt">Quilt</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">MC Version</label>
              <select className="select" value={form.mcVersion} onChange={e => setForm(f => ({ ...f, mcVersion: e.target.value }))}>
                {['1.21','1.20.4','1.20.1','1.19.4','1.18.2'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Privacy</label>
            <select className="select" value={form.privacy} onChange={e => setForm(f => ({ ...f, privacy: e.target.value }))}>
              <option value="private">🔒 Private</option>
              <option value="public">🌍 Public</option>
              <option value="unlisted">👁️ Unlisted</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleCreate} id="create-pack-btn">Create Modpack</button>
        </div>
      </div>
    </div>
  );
}

function ExportModal({ modpack, onClose }) {
  const { exportModpack } = useModpackStore();
  const { addToast } = useUIStore();
  const { incrementStat } = useAuthStore();
  const [format, setFormat] = useState('json');
  const output = exportModpack(modpack.id, format);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    incrementStat('exports');
    addToast('Copied to clipboard!', 'success');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-scale" style={{ maxWidth:600 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Export "{modpack.name}"</span>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="tabs" style={{ marginBottom:16 }}>
            {['json','curseforge','modrinth'].map(f => (
              <button key={f} className={`tab${format === f ? ' active' : ''}`} onClick={() => setFormat(f)}>
                {f === 'json' ? '📄 JSON' : f === 'curseforge' ? '🔥 CurseForge' : '🌿 Modrinth'}
              </button>
            ))}
          </div>
          <pre style={{ background:'var(--bg-primary)', padding:16, borderRadius:'var(--radius-md)', fontSize:11, fontFamily:'var(--font-mono)', overflowX:'auto', maxHeight:300, border:'1px solid var(--border)', color:'var(--text-secondary)', whiteSpace:'pre-wrap', wordBreak:'break-all' }}>
            {output}
          </pre>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={copyToClipboard}>📋 Copy to Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default function ModpackManager() {
  const { modpacks, activeModpackId, setActive, createModpack, updateModpack, deleteModpack, cloneModpack, removeModFromModpack, reorderMods, undo, redo, undoStack, redoStack, getTotalSize } = useModpackStore();
  const { addToast } = useUIStore();
  const { incrementStat } = useAuthStore();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const active = modpacks.find(p => p.id === activeModpackId);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active: a, over }) => {
    if (!over || a.id === over.id || !activeModpackId) return;
    const oldOrder = active?.modIds || [];
    const oldIdx = oldOrder.indexOf(a.id);
    const newIdx = oldOrder.indexOf(over.id);
    reorderMods(activeModpackId, arrayMove(oldOrder, oldIdx, newIdx));
  };

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); addToast('Undone', 'info'); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); addToast('Redone', 'info'); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDelete = (id) => {
    deleteModpack(id);
    addToast('Modpack deleted', 'error');
    setDeleteConfirm(null);
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <div>
          <h1 className="section-title">📦 My Modpacks</h1>
          <div className="section-sub">{modpacks.length} modpacks</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm" onClick={undo} disabled={!undoStack.length} title="Undo (Ctrl+Z)"><Undo2 size={14} /></button>
          <button className="btn btn-secondary btn-sm" onClick={redo} disabled={!redoStack.length} title="Redo (Ctrl+Shift+Z)"><Redo2 size={14} /></button>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)} id="new-modpack-btn"><Plus size={15} /> New Modpack</button>
        </div>
      </div>

      <div style={{ display:'flex', gap:20 }}>
        {/* Modpack list */}
        <div style={{ width:280, flexShrink:0 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {modpacks.map(mp => {
              const PrivIcon = privacyIcons[mp.privacy] || Lock;
              return (
                <div key={mp.id}
                  className={`card${mp.id === activeModpackId ? ' card-glow' : ''}`}
                  style={{ padding:14, cursor:'pointer', border: mp.id === activeModpackId ? '1px solid var(--accent)' : undefined }}
                  onClick={() => setActive(mp.id)}>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <div style={{ width:40, height:40, borderRadius:'var(--radius-md)', background:mp.banner, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{mp.icon}</div>
                    <div style={{ flex:1, overflow:'hidden' }}>
                      <div style={{ fontSize:14, fontWeight:700 }} className="truncate">{mp.name}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)' }}>{mp.modIds.length} mods · {mp.loader}</div>
                    </div>
                    {mp.id === activeModpackId && <Check size={14} style={{ color:'var(--accent)', flexShrink:0 }} />}
                  </div>
                  <div style={{ display:'flex', gap:6, marginTop:8 }}>
                    <span className="badge badge-gray" style={{ fontSize:10 }}><PrivIcon size={9} /> {mp.privacy}</span>
                    <span className="badge badge-gray" style={{ fontSize:10 }}>MC {mp.mcVersion}</span>
                    <div style={{ marginLeft:'auto', display:'flex', gap:4 }}>
                      <button className="icon-btn" style={{ width:26, height:26 }} onClick={e => { e.stopPropagation(); cloneModpack(mp.id); addToast('Cloned!', 'success'); }} title="Clone"><Copy size={11} /></button>
                      <button className="icon-btn" style={{ width:26, height:26, color:'var(--danger)' }} onClick={e => { e.stopPropagation(); setDeleteConfirm(mp.id); }} title="Delete"><Trash2 size={11} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
            {modpacks.length === 0 && (
              <div className="empty-state" style={{ padding:40, border:'1px dashed var(--border)', borderRadius:'var(--radius-lg)' }}>
                <div className="empty-icon">📦</div>
                <div className="empty-sub">No modpacks yet</div>
                <button className="btn btn-primary btn-sm mt-3" onClick={() => setShowCreate(true)}>Create First Pack</button>
              </div>
            )}
          </div>
        </div>

        {/* Active modpack editor */}
        <div style={{ flex:1, minWidth:0 }}>
          {!active ? (
            <div className="empty-state card" style={{ height:400 }}>
              <div className="empty-icon">👈</div>
              <div className="empty-title">No modpack selected</div>
              <div className="empty-sub">Click a modpack on the left to start editing, or create a new one.</div>
              <button className="btn btn-primary mt-3" onClick={() => setShowCreate(true)}><Plus size={14} /> New Modpack</button>
            </div>
          ) : (
            <div className="card" style={{ padding:20 }}>
              {/* Header */}
              <div style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:60, height:60, borderRadius:'var(--radius-md)', background:active.banner, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>{active.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:20, fontWeight:800 }}>{active.name}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{active.description || 'No description'}</div>
                  <div style={{ display:'flex', gap:8, marginTop:6, flexWrap:'wrap' }}>
                    <span className="badge badge-green">{active.loader}</span>
                    <span className="badge badge-blue">MC {active.mcVersion}</span>
                    <span className="badge badge-gray">v{active.version}</span>
                    <span className="badge badge-gray">{getTotalSize(active.id)} total</span>
                    <span className="badge badge-gray">{active.modIds.length} mods</span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowHistory(v => !v)}><HistoryIcon size={13} /> History</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setShowExport(true); incrementStat('exports'); }}><Download size={13} /> Export</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { navigator.clipboard.writeText(`https://modforge.app/pack/${active.id}`); addToast('Share link copied!', 'success'); }}><Share2 size={13} /></button>
                </div>
              </div>

              {/* Version history */}
              {showHistory && (
                <div style={{ marginBottom:16, padding:14, background:'var(--bg-secondary)', borderRadius:'var(--radius-md)', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>📜 Version History</div>
                  {active.history.length === 0 ? <div style={{ fontSize:12, color:'var(--text-muted)' }}>No version history yet.</div> : active.history.map((h, i) => (
                    <div key={i} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom: i < active.history.length-1 ? '1px solid var(--border)' : 'none' }}>
                      <span className="badge badge-gray" style={{ flexShrink:0 }}>v{h.version}</span>
                      <span style={{ fontSize:12, color:'var(--text-secondary)', flex:1 }}>{h.changes}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)', flexShrink:0 }}>{new Date(h.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mods list with DnD */}
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>
                Mods ({active.modIds.length}) — drag to reorder
              </div>
              {active.modIds.length === 0 ? (
                <div className="empty-state" style={{ padding:32, border:'1px dashed var(--border)', borderRadius:'var(--radius-md)', marginBottom:12 }}>
                  <div className="empty-icon">🧩</div>
                  <div className="empty-sub">No mods added yet. Browse the mod library to get started.</div>
                  <button className="btn btn-primary btn-sm mt-2" onClick={() => navigate('/mods')}>Browse Mods</button>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={active.modIds} strategy={verticalListSortingStrategy}>
                    <div>
                      {active.modIds.map(id => (
                        <SortableMod key={id} modId={id} onRemove={(mid) => { removeModFromModpack(active.id, mid); addToast('Mod removed', 'info'); }} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirm delete */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal animate-scale" style={{ maxWidth:380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ textAlign:'center', padding:32 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🗑️</div>
              <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>Delete Modpack?</div>
              <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:24 }}>This action cannot be undone.</div>
              <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
      {showExport && active && <ExportModal modpack={active} onClose={() => setShowExport(false)} />}
    </div>
  );
}
