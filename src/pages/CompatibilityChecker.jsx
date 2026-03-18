import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, Plus, X, Zap, Download, ArrowRight, RefreshCw } from 'lucide-react';
import { useModpackStore } from '../store/modpackStore.js';
import { useUIStore } from '../store/uiStore.js';
import { MODS } from '../data/mods.js';

function checkCompatibility(modIds) {
  const issues = [];
  const selectedMods = modIds.map(id => MODS.find(m => m.id === id)).filter(Boolean);
  const loaderSets = { forge:[], fabric:[], neoforge:[], quilt:[] };
  selectedMods.forEach(m => m.loaders.forEach(l => loaderSets[l].push(m.name)));

  const forgeExclusive = selectedMods.filter(m => m.loaders.includes('forge') && !m.loaders.includes('fabric') && !m.loaders.includes('neoforge'));
  const fabricExclusive = selectedMods.filter(m => m.loaders.includes('fabric') && !m.loaders.includes('forge') && !m.loaders.includes('neoforge') && !m.loaders.includes('quilt'));
  if (forgeExclusive.length > 0 && fabricExclusive.length > 0) {
    issues.push({ type:'error', title:'Loader Conflict', detail:`Cannot mix Forge-exclusive and Fabric-exclusive mods. Forge-only: ${forgeExclusive.map(m=>m.name).join(', ')}. Fabric-only: ${fabricExclusive.map(m=>m.name).join(', ')}`, fix:'Remove mods for one loader' });
  }

  selectedMods.forEach(mod => {
    mod.dependencies.forEach(dep => {
      const depMod = MODS.find(m => m.name === dep);
      if (depMod && !modIds.includes(depMod.id)) {
        issues.push({ type:'warning', title:'Missing Dependency', detail:`"${mod.name}" requires "${dep}" to work correctly.`, fix:`Add "${dep}"`, fixModId: depMod.id });
      }
    });
    mod.incompatibleWith.forEach(name => {
      const incompat = MODS.find(m => m.name === name);
      if (incompat && modIds.includes(incompat.id)) {
        issues.push({ type:'error', title:'Mod Conflict', detail:`"${mod.name}" is incompatible with "${name}".`, fix:`Remove "${name}" or "${mod.name}"`, removeModId: incompat.id });
      }
    });
  });

  if (issues.length === 0 && modIds.length > 0) {
    issues.push({ type:'success', title:'All Clear!', detail:'No compatibility issues detected. Your modpack is ready to play!' });
  }
  return issues;
}

function estimatePerformance(modIds) {
  const mods = modIds.map(id => MODS.find(m => m.id === id)).filter(Boolean);
  const ramBase = 2048;
  const ramPerMod = mods.reduce((sum, m) => sum + (m.ramImpact || 0) * 128, 0);
  const totalRam = ramBase + ramPerMod;
  const fpsDelta = mods.reduce((sum, m) => sum - (m.fpsImpact || 0) * 3, 0);
  return { ram: totalRam, fpsDelta };
}

const catIcons = { Utility:'🔧', Tech:'⚙️', Performance:'⚡', Magic:'🔮', Adventure:'🗺️', 'World Gen':'🌍', Food:'🍎', Graphics:'🎨', Library:'📚', Tools:'🛠️', Building:'🏗️' };

export default function CompatibilityChecker() {
  const { modpacks, activeModpackId, addModToModpack, removeModFromModpack } = useModpackStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const active = modpacks.find(p => p.id === activeModpackId);
  const modIds = active?.modIds || [];
  const issues = checkCompatibility(modIds);
  const perf = estimatePerformance(modIds);
  const mods = modIds.map(id => MODS.find(m => m.id === id)).filter(Boolean);

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warnCount = issues.filter(i => i.type === 'warning').length;

  return (
    <div className="animate-fade">
      <div className="section-header">
        <div>
          <h1 className="section-title">✅ Compatibility Checker</h1>
          <div className="section-sub">Analyzing {modIds.length} mods</div>
        </div>
        {!active && (
          <button className="btn btn-primary" onClick={() => navigate('/modpacks')}>Select a Modpack <ArrowRight size={14} /></button>
        )}
      </div>

      {!active ? (
        <div className="empty-state card" style={{ height:300 }}>
          <div className="empty-icon">📦</div>
          <div className="empty-title">No modpack selected</div>
          <div className="empty-sub">Select or create a modpack in My Modpacks to run the compatibility check.</div>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/modpacks')}>Go to My Modpacks</button>
        </div>
      ) : (
        <div style={{ display:'flex', gap:20 }}>
          {/* Left: issues */}
          <div style={{ flex:1, minWidth:0 }}>
            {/* Summary */}
            <div className="grid-3" style={{ marginBottom:20 }}>
              {[
                { label:'Errors', count:errorCount, icon:XCircle, color:'var(--danger)', bg:'rgba(239,68,68,0.1)', border:'rgba(239,68,68,0.3)' },
                { label:'Warnings', count:warnCount, icon:AlertTriangle, color:'var(--warning)', bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.3)' },
                { label:'Total Mods', count:modIds.length, icon:CheckCircle, color:'var(--accent)', bg:'var(--accent-glow)', border:'rgba(16,185,129,0.3)' },
              ].map(({ label, count, icon:Icon, color, bg, border }) => (
                <div key={label} style={{ padding:16, borderRadius:'var(--radius-lg)', background:bg, border:`1px solid ${border}`, display:'flex', alignItems:'center', gap:12 }}>
                  <Icon size={24} style={{ color }} />
                  <div>
                    <div style={{ fontSize:24, fontWeight:800, color }}>{count}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Issues list */}
            <div className="card" style={{ padding:20, marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>Issues</div>
              {issues.length === 0 && modIds.length === 0 && (
                <div className="empty-state" style={{ padding:32 }}>
                  <div className="empty-icon">🧩</div>
                  <div className="empty-sub">Add mods to your modpack to check compatibility.</div>
                </div>
              )}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {issues.map((issue, i) => {
                  const iconMap = { error: <XCircle size={16} style={{ color:'var(--danger)', flexShrink:0 }} />, warning: <AlertTriangle size={16} style={{ color:'var(--warning)', flexShrink:0 }} />, success: <CheckCircle size={16} style={{ color:'var(--accent)', flexShrink:0 }} /> };
                  const bgMap = { error:'rgba(239,68,68,0.08)', warning:'rgba(245,158,11,0.08)', success:'var(--accent-glow)' };
                  const borderMap = { error:'rgba(239,68,68,0.3)', warning:'rgba(245,158,11,0.3)', success:'rgba(16,185,129,0.3)' };
                  return (
                    <div key={i} style={{ padding:'12px 14px', borderRadius:'var(--radius-md)', background:bgMap[issue.type], border:`1px solid ${borderMap[issue.type]}` }}>
                      <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                        {iconMap[issue.type]}
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{issue.title}</div>
                          <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{issue.detail}</div>
                          {issue.fix && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>💡 {issue.fix}</div>}
                        </div>
                        {issue.fixModId && (
                          <button className="btn btn-primary btn-sm" onClick={() => { addModToModpack(active.id, issue.fixModId); addToast('Dependency added!', 'success'); }}>
                            <Plus size={12} /> Add
                          </button>
                        )}
                        {issue.removeModId && (
                          <button className="btn btn-danger btn-sm" onClick={() => { removeModFromModpack(active.id, issue.removeModId); addToast('Mod removed', 'info'); }}>
                            <X size={12} /> Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dependency graph (visual) */}
            <div className="card" style={{ padding:20 }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>🕸️ Dependency Map</div>
              {mods.filter(m => m.dependencies.length > 0).length === 0 ? (
                <div style={{ fontSize:13, color:'var(--text-muted)', textAlign:'center', padding:20 }}>No dependencies to show for current mods.</div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {mods.filter(m => m.dependencies.length > 0).map(mod => (
                    <div key={mod.id} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
                      <span style={{ padding:'4px 10px', borderRadius:99, background:'var(--bg-secondary)', fontWeight:600 }}>{mod.name}</span>
                      <ArrowRight size={14} style={{ color:'var(--text-muted)' }} />
                      <span style={{ color:'var(--text-muted)' }}>requires</span>
                      <ArrowRight size={14} style={{ color:'var(--text-muted)' }} />
                      {mod.dependencies.map(dep => {
                        const depMod = MODS.find(m => m.name === dep);
                        const present = depMod && modIds.includes(depMod.id);
                        return <span key={dep} style={{ padding:'4px 10px', borderRadius:99, background: present ? 'var(--accent-glow)' : 'rgba(239,68,68,0.1)', color: present ? 'var(--accent)' : 'var(--danger)', fontWeight:600, border: `1px solid ${present ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}>{dep}</span>;
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: performance + mod list */}
          <div style={{ width:280, flexShrink:0, display:'flex', flexDirection:'column', gap:16 }}>
            <div className="card" style={{ padding:18 }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>⚡ Performance Estimate</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12 }}>
                    <span style={{ color:'var(--text-secondary)' }}>RAM Required</span>
                    <span style={{ fontWeight:700, color: perf.ram > 6000 ? 'var(--danger)' : perf.ram > 4000 ? 'var(--warning)' : 'var(--accent)' }}>{(perf.ram/1024).toFixed(1)} GB</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar progress-green" style={{ width:`${Math.min(100, (perf.ram/8192)*100)}%`, background: perf.ram > 6000 ? 'var(--danger)' : perf.ram > 4000 ? 'var(--warning)' : undefined }} />
                  </div>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:3 }}>Recommended: 4–8 GB allocated</div>
                </div>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12 }}>
                    <span style={{ color:'var(--text-secondary)' }}>FPS Impact</span>
                    <span style={{ fontWeight:700, color: perf.fpsDelta > 0 ? 'var(--accent)' : perf.fpsDelta < -15 ? 'var(--danger)' : 'var(--warning)' }}>
                      {perf.fpsDelta > 0 ? '+' : ''}{perf.fpsDelta} FPS est.
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width:`${Math.min(100, Math.max(5, 50 + perf.fpsDelta*1.5))}%`, background: perf.fpsDelta > 0 ? 'var(--accent)' : perf.fpsDelta < -15 ? 'var(--danger)' : 'var(--warning)' }} />
                  </div>
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', padding:'8px', background:'var(--bg-secondary)', borderRadius:'var(--radius-sm)' }}>
                  Based on {modIds.length} mods. Actual performance varies by hardware.
                </div>
              </div>
            </div>

            <div className="card" style={{ padding:18 }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:10 }}>Mods in Pack</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:320, overflowY:'auto' }}>
                {mods.map(m => (
                  <div key={m.id} style={{ display:'flex', gap:8, alignItems:'center', fontSize:12 }}>
                    <span>{catIcons[m.category] || '📦'}</span>
                    <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.name}</span>
                    <span style={{ color:'var(--text-muted)', flexShrink:0 }}>{m.size}</span>
                  </div>
                ))}
                {mods.length === 0 && <div style={{ fontSize:12, color:'var(--text-muted)', textAlign:'center' }}>No mods</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
