import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard, Badge } from '../../shared/ui.jsx'
import { systemUsers, auditLog, roles } from '../../data/datasets.js'
import { DEMO_USERS } from '../../data/demo-users.js'
import { useSession } from '../../app/session.jsx'

function Overview() {
  const navigate = useNavigate()
  const { loginAs } = useSession()
  const openWorkspace = (ws) => { loginAs(ws); navigate(`/w/${ws}`) }
  const activeUsers = systemUsers.filter(u=>u.status==='active').length

  return (
    <>
      <PageHeader title="Governance Overview" subtitle="System administration & oversight — NOT an operational super-sidebar" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Active Users" value={activeUsers} sub={`of ${systemUsers.length} total`} icon={Icons.Users} tone="green" />
        <KpiCard label="Roles" value={roles.length} sub="Configured" icon={Icons.KeyRound} tone="blue" />
        <KpiCard label="Audit Events (14d)" value={auditLog.length} sub="Logged" icon={Icons.Activity} tone="gray" />
        <KpiCard label="System Status" value="Healthy" sub="All services up" icon={Icons.CheckCircle2} tone="green" />
      </div>

      <SectionCard title="Open Workspace — Governance Launch">
        <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Admin may launch any operational workspace for oversight. This does not inherit operational sidebars.
        </p>
        <div className="grid-cards">
          {DEMO_USERS.filter(u => u.workspace !== 'admin').map(u => {
            const Icon = Icons[u.icon] || Icons.Square
            return (
              <button key={u.id} className="card" onClick={() => openWorkspace(u.workspace)}
                style={{ padding: 16, textAlign: 'left', cursor: 'pointer' }}>
                <div className="row gap-2" style={{ marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: u.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={u.color} />
                  </div>
                  <strong style={{ fontSize: 13.5, textTransform: 'capitalize' }}>{u.workspace}</strong>
                </div>
                <div className="row gap-2" style={{ fontSize: 12, color: u.color, fontWeight: 600 }}>
                  Open Workspace <Icons.ArrowRight size={13} />
                </div>
              </button>
            )
          })}
        </div>
      </SectionCard>
    </>
  )
}
function Users() {
  return (<><PageHeader title="User Management" subtitle={`${systemUsers.length} users`} actions={<button className="btn primary"><Icons.UserPlus size={15}/> Add User</button>} />
    <DataTable columns={[
      { key: 'name', label: 'User' }, { key: 'role', label: 'Role' }, { key: 'workspace', label: 'Workspace' },
      { key: 'lastLogin', label: 'Last Login' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={systemUsers} /></>)
}
function RolesView() {
  return (<><PageHeader title="Role Control" subtitle="Access roles & permissions" />
    <DataTable columns={[
      { key: 'name', label: 'Role' }, { key: 'users', label: 'Users', align: 'right' }, { key: 'perms', label: 'Permissions' },
    ]} rows={roles} /></>)
}
function Monitoring() {
  return (<><PageHeader title="System Monitoring" subtitle="Runtime health" />
    <div className="kpi-grid">
      <KpiCard label="API Latency" value="42ms" sub="p95" icon={Icons.Gauge} tone="green" />
      <KpiCard label="Uptime" value="99.98%" sub="30 days" icon={Icons.Activity} tone="green" />
      <KpiCard label="Active Sessions" value={systemUsers.filter(u=>u.status==='active').length} icon={Icons.Wifi} tone="blue" />
      <KpiCard label="Error Rate" value="0.02%" sub="Last 24h" icon={Icons.AlertCircle} tone="amber" />
    </div></>)
}
function Security() {
  return (<><PageHeader title="Security Logs" subtitle="Audit trail" />
    <DataTable columns={[
      { key: 'time', label: 'Time' }, { key: 'user', label: 'User' }, { key: 'action', label: 'Action' },
      { key: 'module', label: 'Module', render: (r) => <Badge tone="blue">{r.module}</Badge> }, { key: 'ip', label: 'IP' },
    ]} rows={auditLog} /></>)
}
function Config() {
  return (<><PageHeader title="ERP Configuration" subtitle="System settings" />
    <SectionCard title="Organization">
      {[['Legal Entity','MJ Agro Trading (Pvt) Ltd'],['Brand','TAVAAZO'],['Base Currency','EUR (€)'],['Fiscal Year','July – June'],['Markets','France, Germany, GCC, Domestic'],['Runtime','Vite + React + React Router']].map(([k,v]) => (
        <div key={k} className="row between" style={{ padding: '10px 0', borderBottom: '1px solid #f0f1f3' }}>
          <span className="muted">{k}</span><strong style={{ fontSize: 13 }}>{v}</strong>
        </div>
      ))}
    </SectionCard></>)
}

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="users" element={<Users />} />
      <Route path="roles" element={<RolesView />} />
      <Route path="monitoring" element={<Monitoring />} />
      <Route path="security" element={<Security />} />
      <Route path="config" element={<Config />} />
    </Routes>
  )
}
