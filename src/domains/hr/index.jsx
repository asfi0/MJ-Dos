import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, Avatar, SectionCard } from '../../shared/ui.jsx'
import { employees, leaves, payroll } from '../../data/datasets.js'
import { money } from '../../data/seed.js'

function Dashboard() {
  const active = employees.filter(e => e.status === 'active').length
  const onLeave = employees.filter(e => e.status === 'on_leave').length
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length
  const monthlyPayroll = payroll.reduce((s, p) => s + p.net, 0)
  return (
    <>
      <PageHeader title="HR Dashboard" subtitle="People operations overview — MJ Agro Trading" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Total Employees" value={employees.length} sub={`${active} active`} icon={Icons.Users} tone="blue" />
        <KpiCard label="On Leave" value={onLeave} sub="Currently away" icon={Icons.Plane} tone="amber" />
        <KpiCard label="Pending Leave Requests" value={pendingLeaves} sub="Awaiting approval" icon={Icons.Clock} tone="amber" />
        <KpiCard label="Monthly Payroll" value={money(monthlyPayroll)} sub="Net disbursement" icon={Icons.Wallet} tone="green" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <SectionCard title="Recent Joiners">
          <DataTable
            columns={[
              { key: 'name', label: 'Employee', render: (r) => <span className="row gap-2"><Avatar initials={r.initials} color={r.color} />{r.name}</span> },
              { key: 'dept', label: 'Department' },
              { key: 'designation', label: 'Role' },
              { key: 'hireDate', label: 'Joined' },
            ]}
            rows={[...employees].sort((a,b) => b.hireDate.localeCompare(a.hireDate)).slice(0, 6)}
          />
        </SectionCard>
        <SectionCard title="Department Headcount">
          {Object.entries(employees.reduce((acc, e) => { acc[e.dept] = (acc[e.dept]||0)+1; return acc }, {}))
            .sort((a,b) => b[1]-a[1]).map(([dept, n]) => (
            <div key={dept} className="row between" style={{ padding: '7px 0', borderBottom: '1px solid #f0f1f3' }}>
              <span style={{ fontSize: 13 }}>{dept}</span>
              <span className="badge blue">{n}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </>
  )
}

function Employees() {
  return (
    <>
      <PageHeader title="Employees" subtitle={`${employees.length} records`}
        actions={<button className="btn primary"><Icons.Plus size={15} /> Add Employee</button>} />
      <DataTable
        columns={[
          { key: 'name', label: 'Employee', render: (r) => <span className="row gap-2"><Avatar initials={r.initials} color={r.color} /><div><div style={{fontWeight:600}}>{r.name}</div><div className="muted" style={{fontSize:11}}>{r.id}</div></div></span> },
          { key: 'dept', label: 'Department' },
          { key: 'designation', label: 'Designation' },
          { key: 'location', label: 'Location' },
          { key: 'salary', label: 'Salary', align: 'right', render: (r) => money(r.salary) },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ]}
        rows={employees}
      />
    </>
  )
}

function Payroll() {
  const total = payroll.reduce((s, p) => s + p.net, 0)
  return (
    <>
      <PageHeader title="Payroll" subtitle="Current cycle" actions={<button className="btn primary"><Icons.Play size={15}/> Run Payroll</button>} />
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <KpiCard label="Net Disbursement" value={money(total)} icon={Icons.Wallet} tone="green" />
        <KpiCard label="Employees" value={payroll.length} icon={Icons.Users} tone="blue" />
        <KpiCard label="Paid" value={payroll.filter(p=>p.status==='paid').length} icon={Icons.CheckCircle2} tone="green" />
      </div>
      <DataTable
        columns={[
          { key: 'employee', label: 'Employee', render: (r) => <span className="row gap-2"><Avatar initials={r.initials} color={r.color} />{r.employee}</span> },
          { key: 'dept', label: 'Dept' },
          { key: 'gross', label: 'Gross', align: 'right', render: (r) => money(r.gross) },
          { key: 'deductions', label: 'Deductions', align: 'right', render: (r) => money(r.deductions) },
          { key: 'net', label: 'Net', align: 'right', render: (r) => <strong>{money(r.net)}</strong> },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ]}
        rows={payroll}
      />
    </>
  )
}

function Leave() {
  return (
    <>
      <PageHeader title="Leave Requests" subtitle={`${leaves.filter(l=>l.status==='pending').length} pending approval`} />
      <DataTable
        columns={[
          { key: 'employee', label: 'Employee', render: (r) => <span className="row gap-2"><Avatar initials={r.initials} color={r.color} />{r.employee}</span> },
          { key: 'type', label: 'Type', render: (r) => <span style={{textTransform:'capitalize'}}>{r.type}</span> },
          { key: 'from', label: 'From' },
          { key: 'days', label: 'Days', align: 'right' },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ]}
        rows={leaves}
      />
    </>
  )
}

function Simple({ title, sub, icon }) {
  const Icon = Icons[icon] || Icons.Square
  return (
    <>
      <PageHeader title={title} subtitle={sub} />
      <div className="card" style={{ padding: 48, textAlign: 'center' }}>
        <Icon size={40} color="#98a2b3" style={{ margin: '0 auto 14px' }} />
        <p className="muted">{title} module — data wired from HR service layer.</p>
      </div>
    </>
  )
}

export default function HR() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="employees" element={<Employees />} />
      <Route path="attendance" element={<Simple title="Attendance" sub="Daily attendance tracking" icon="CalendarCheck" />} />
      <Route path="payroll" element={<Payroll />} />
      <Route path="leave" element={<Leave />} />
      <Route path="training" element={<Simple title="Training & Development" sub="Employee training records" icon="GraduationCap" />} />
    </Routes>
  )
}
