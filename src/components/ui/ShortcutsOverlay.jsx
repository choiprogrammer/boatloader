import { useUIStore } from '../../store/uiStore.js';
import { X } from 'lucide-react';

const shortcuts = [
  { key: 'Ctrl+K', desc: 'Open global search' },
  { key: '?', desc: 'Toggle shortcuts overlay' },
  { key: 'Escape', desc: 'Close modal / search' },
  { key: 'Ctrl+Z', desc: 'Undo (modpack editor)' },
  { key: 'Ctrl+Shift+Z', desc: 'Redo (modpack editor)' },
  { key: 'G then D', desc: 'Go to Dashboard' },
  { key: 'G then M', desc: 'Go to Mod Library' },
  { key: 'G then P', desc: 'Go to My Modpacks' },
  { key: 'G then E', desc: 'Go to Explore' },
  { key: 'T', desc: 'Toggle theme' },
];

export default function ShortcutsOverlay() {
  const { shortcutsOpen, toggleShortcuts } = useUIStore();
  if (!shortcutsOpen) return null;
  return (
    <div className="modal-overlay" onClick={toggleShortcuts}>
      <div className="modal animate-scale" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">⌨️ Keyboard Shortcuts</span>
          <button className="icon-btn" onClick={toggleShortcuts}><X size={16} /></button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {shortcuts.map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.desc}</span>
              <kbd style={{ fontSize: 12, padding: '3px 8px', background: 'var(--bg-tertiary)', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{s.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
