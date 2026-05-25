import React from 'react'

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="row between wrap gap-3" style={{ marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>
        {subtitle && <p className="muted" style={{ marginTop: 4 }}>{subtitle}</p>}
      </div>
      {actions && <div className="row gap-2">{actions}</div>}
    </div>
  )
}

export function KpiCard({ label, value, sub, icon: Icon, tone = 'gray' }) {
  const toneColors = {
    gray: '#475467', green: '#027a48', red: '#b42318', amber: '#b54708', blue: '#175cd3',
  }
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="row between">
        <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
        {Icon && <Icon size={18} color={toneColors[tone]} />}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, marginTop: 10 }}>{value}</div>
      {sub && <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export function Badge({ children, tone = 'gray' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

const statusTones = {
  active: 'green', paid: 'green', approved: 'green', posted: 'green', delivered: 'green',
  in_stock: 'green', final: 'green', fulfilled: 'green', closed: 'green', responded: 'blue',
  pending: 'amber', pending_approval: 'amber', draft: 'gray', in_transit: 'blue',
  preparing: 'blue', scheduled: 'blue', quarantine: 'amber', pending_signature: 'amber',
  on_leave: 'blue', unpaid: 'amber', overdue: 'red', rejected: 'red', suspended: 'red',
  open: 'amber', high: 'red', medium: 'amber', low: 'gray', resigned: 'gray', inactive: 'gray',
}
export function StatusBadge({ status }) {
  const label = String(status).replace(/_/g, ' ')
  return <span className={`badge ${statusTones[status] || 'gray'}`} style={{ textTransform: 'capitalize' }}>{label}</span>
}

export function DataTable({ columns, rows, empty = 'No records' }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>{columns.map((c) => <th key={c.key} style={c.align ? { textAlign: c.align } : null}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: 32 }} className="muted">{empty}</td></tr>
            ) : rows.map((r, i) => (
              <tr key={r.id || i}>
                {columns.map((c) => (
                  <td key={c.key} style={c.align ? { textAlign: c.align } : null}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Avatar({ initials, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 30, height: 30, borderRadius: '50%', background: color || '#888',
      color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>{initials}</span>
  )
}

export function SectionCard({ title, action, children }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700 }}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export function CapacityBar({ used, capacity }) {
  const pct = Math.round((used / capacity) * 100)
  const tone = pct > 85 ? '#dc2626' : pct > 65 ? '#ea580c' : '#16a34a'
  return (
    <div>
      <div className="row between" style={{ fontSize: 12, marginBottom: 4 }}>
        <span className="muted">{used.toLocaleString()} / {capacity.toLocaleString()}</span>
        <span style={{ fontWeight: 600, color: tone }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: '#f0f1f3', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: tone }} />
      </div>
    </div>
  )
}
