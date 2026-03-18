import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Package, CheckCircle, Star } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useUIStore } from '../store/uiStore.js';

function strengthScore(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const strengthLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];

export default function Landing() {
  const [tab, setTab] = useState('login'); // login | signup | reset
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', username: '', remember: false });
  const [errors, setErrors] = useState({});
  const { login, signup } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const pw = form.password;
  const score = tab === 'signup' ? strengthScore(pw) : 0;

  const validate = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Invalid email address';
    if (tab !== 'reset' && pw.length < 6) e.password = 'Password must be at least 6 characters';
    if (tab === 'signup' && !form.username.trim()) e.username = 'Username is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (tab === 'login') {
      login(form.email, form.password, form.remember);
      addToast('Welcome back! 👋', 'success');
      navigate('/dashboard');
    } else if (tab === 'signup') {
      signup(form.username, form.email);
      addToast('Account created! Let\'s build something awesome 🚀', 'success');
      navigate('/dashboard');
    } else {
      addToast('Password reset link sent to ' + form.email, 'info');
      setTab('login');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        {/* BG decoration */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 420, width: '100%', margin: '0 auto', position: 'relative' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <img src="/boat-icon.png" alt="BoatLoader" style={{ width:44, height:44, objectFit:'contain', flexShrink:0 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Boat<span style={{ color: 'var(--accent)' }}>Loader</span></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Minecraft Modpack Manager</div>
            </div>
          </div>

          {tab !== 'reset' && (
            <div className="tabs" style={{ marginBottom: 28 }}>
              <button className={`tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')} id="tab-login">Sign In</button>
              <button className={`tab${tab === 'signup' ? ' active' : ''}`} onClick={() => setTab('signup')} id="tab-signup">Create Account</button>
            </div>
          )}

          {tab === 'reset' && (
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800 }}>Reset Password</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 6 }}>We'll send a reset link to your email</p>
            </div>
          )}

          {tab !== 'reset' && (
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{tab === 'login' ? 'Welcome back' : 'Join BoatLoader'}</h1>
          )}
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
            {tab === 'login' ? 'Sign in to manage your modpacks' : tab === 'signup' ? 'Start building amazing modpacks' : ''}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
            {tab === 'signup' && (
              <div className="form-group">
                <label className="form-label">Username</label>
                <input id="input-username" className="input" placeholder="Steve_Builder" value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))} autoComplete="username" />
                {errors.username && <span className="form-error">{errors.username}</span>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input id="input-email" className="input" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {tab !== 'reset' && (
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Password
                  {tab === 'login' && <button type="button" onClick={() => setTab('reset')} style={{ background:'none', border:'none', color:'var(--accent)', fontSize:12, cursor:'pointer', fontWeight:500 }}>Forgot password?</button>}
                </label>
                <div style={{ position: 'relative' }}>
                  <input id="input-password" className="input" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                    style={{ paddingRight: 42 }}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {tab === 'signup' && pw.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{ height: 3, flex: 1, borderRadius: 99, background: i <= score ? strengthColors[score] : 'var(--bg-tertiary)', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: strengthColors[score] }}>{strengthLabels[score]}</div>
                  </div>
                )}
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>
            )}

            {tab === 'login' && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ accentColor: 'var(--accent)' }} />
                Remember me
              </label>
            )}

            <button className="btn btn-primary btn-lg" type="submit" id="auth-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block' }} /> : null}
              {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : tab === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>

            {tab === 'reset' && (
              <button type="button" className="btn btn-ghost" onClick={() => setTab('login')} style={{ justifyContent: 'center' }}>Back to Sign In</button>
            )}
          </form>

          <div style={{ marginTop: 20, padding: 14, background: 'var(--accent-glow)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent)' }}>Demo credentials:</strong> use any email & password to sign in.
          </div>
        </div>
      </div>

      {/* Right panel - hidden on mobile */}
      <div style={{ flex: 1, background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 80% 50%, rgba(99,102,241,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>
            The ultimate<br /><span className="gradient-text">Minecraft modpack</span><br />manager
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 36 }}>
            Discover mods, build perfect modpacks, check compatibility, and share with the community.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: Package, text: '52+ mods in our curated library' },
              { icon: CheckCircle, text: 'Smart compatibility checker' },
              { icon: Star, text: 'Community ratings & reviews' },
              { icon: Zap, text: 'Export to CurseForge, Modrinth & more' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-glow)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
