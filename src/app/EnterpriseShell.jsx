import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { WORKSPACES } from './workspace-config.js'
import { useSession } from './session.jsx'

export default function EnterpriseShell({ children }) {
  const { workspace } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useSession()
  const ws = WORKSPACES[workspace]

  if (!ws) {
    return (
      <div style={{ padding: 40 }}>
        <p>Unknown workspace. <button className="btn" onClick={() => navigate('/')}>Back to launcher</button></p>
      </div>
    )
  }

  const handleLogout = () => { logout(); navigate('/') }
  const initials = user ? user.name.split(' ').map(w => w[0]).join('') : '?'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar — domain isolated */}
      <aside style={{
        width: 252, flexShrink: 0, background: '#0f1115', color: '#e4e7ec',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Workspace brand */}
        <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <div className="row gap-2" style={{ marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: ws.color }} />
            <span style={{ fontSize: 11, letterSpacing: '.14em', color: '#d4af37', fontWeight: 600 }}>MJ-DOS ERP</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{ws.label}</div>
        </div>

        {/* Nav — only this domain's items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {ws.nav.map((item) => {
            const Icon = Icons[item.icon] || Icons.Circle
            const target = item.to === '' ? `/w/${workspace}` : `/w/${workspace}/${item.to}`
            return (
              <NavLink key={item.to} to={target} end={item.to === ''}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: 11, padding: '9px 12px',
                  borderRadius: 8, marginBottom: 3, fontSize: 13.5, fontWeight: 500,
                  color: isActive ? '#fff' : '#98a2b3',
                  background: isActive ? ws.color : 'transparent',
                  transition: 'all .12s',
                })}
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* User + logout */}
        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div className="row gap-2" style={{ padding: '8px 10px', marginBottom: 6 }}>
            <span style={{
              width: 32, height: 32, borderRadius: '50%', background: ws.color, color: '#fff',
              fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{initials}</span>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: '#98a2b3' }}>{user?.title}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: 'rgba(255,255,255,.06)', color: '#e4e7ec', border: '1px solid rgba(255,255,255,.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}>
            <Icons.LogOut size={15} /> Switch Workspace
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{
          height: 54, flexShrink: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between',
        }}>
          <div className="row gap-2">
            <Icons.Boxes size={18} color={ws.color} />
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{ws.label}</span>
            <span className="badge gray" style={{ marginLeft: 6 }}>Demo Mode</span>
          </div>
          <div className="row gap-3">
            <Icons.Bell size={18} color="#98a2b3" />
            <Icons.HelpCircle size={18} color="#98a2b3" />
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
