import { useUIStore } from '../../store/uiStore.js';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
const colors = { success: 'var(--accent)', error: 'var(--danger)', warning: 'var(--warning)', info: 'var(--info)' };

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();
  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map(t => {
        const Icon = icons[t.type] || Info;
        return (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <Icon size={16} style={{ color: colors[t.type], flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{t.message}</span>
            <button onClick={() => removeToast(t.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:0 }}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
