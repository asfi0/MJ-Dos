import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { DEMO_USERS } from '../data/demo-users.js'
import { useSession } from './session.jsx'

export default function Launcher() {
  const navigate = useNavigate()
  const { loginAs } = useSession()

  const launch = (ws) => {
    loginAs(ws)
    navigate(`/w/${ws}`)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top brand bar */}
      <header style={{
        background: 'linear-gradient(135deg, #034f06 0%, #046307 55%, #05751f 100%)',
        color: '#fff', padding: '40px 32px 56px',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="row gap-3" style={{ marginBottom: 20 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(212,175,55,.5)',
            }}>
              <Icons.Boxes size={24} color="#d4af37" />
            </div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '.18em', color: '#d4af37', fontWeight: 600 }}>MJ AGRO TRADING</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>Enterprise Resource Planning</div>
            </div>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, maxWidth: 640, lineHeight: 1.2 }}>
            MJ-DOS ERP — Workspace Launcher
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.82)', marginTop: 10, maxWidth: 620 }}>
            Select a workspace to enter demo mode. Each workspace is fully isolated with its own
            navigation, dashboard and operational screens.
          </p>
        </div>
      </header>

      {/* Workspace grid */}
      <main style={{ flex: 1, padding: '0 32px', marginTop: -32 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="grid-cards">
            {DEMO_USERS.map((u) => {
              const Icon = Icons[u.icon] || Icons.Square
              return (
                <button key={u.id} onClick={() => launch(u.workspace)} className="card"
                  style={{
                    padding: 0, textAlign: 'left', border: '1px solid var(--border)',
                    overflow: 'hidden', transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(16,24,40,.14)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ height: 4, background: u.color }} />
                  <div style={{ padding: 20 }}>
                    <div className="row between" style={{ marginBottom: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, background: u.color + '18',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={22} color={u.color} />
                      </div>
                      <Icons.ArrowRight size={18} color="#98a2b3" />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{u.title.includes('Admin') ? 'Admin Workspace' : u.workspace.charAt(0).toUpperCase() + u.workspace.slice(1) + ' Workspace'}</div>
                    <div className="muted" style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.5, minHeight: 38 }}>{u.desc}</div>
                    <div className="row gap-2" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%', background: u.color,
                        color: '#fff', fontSize: 10, fontWeight: 700,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>{u.name.split(' ').map(w => w[0]).join('')}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{u.name}</div>
                        <div className="muted" style={{ fontSize: 11 }}>{u.title}</div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </main>

      <footer style={{ padding: '28px 32px', textAlign: 'center' }} className="muted">
        <span style={{ fontSize: 12 }}>MJ-DOS ERP · Demo Mode · TAVAAZO / MJ Agro Trading (Pvt) Ltd</span>
      </footer>
    </div>
  )
}
