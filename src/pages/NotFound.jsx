import { useNavigate } from 'react-router-dom';
import { Home, Package, Boxes } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--bg-primary)', gap:20, padding:24, textAlign:'center' }}>
      <div style={{ fontSize:80, lineHeight:1, userSelect:'none' }}>💥</div>
      <div style={{ fontSize:72, fontWeight:900, lineHeight:1, color:'var(--border)' }}>404</div>
      <div style={{ fontSize:22, fontWeight:800 }}>Page Not Found</div>
      <div style={{ fontSize:15, color:'var(--text-secondary)', maxWidth:360 }}>
        Looks like a Creeper blew up this page. The URL you're looking for doesn't exist.
      </div>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}><Home size={15} /> Go Home</button>
        <button className="btn btn-secondary" onClick={() => navigate('/mods')}><Package size={15} /> Browse Mods</button>
        <button className="btn btn-secondary" onClick={() => navigate('/modpacks')}><Boxes size={15} /> My Modpacks</button>
      </div>
    </div>
  );
}
