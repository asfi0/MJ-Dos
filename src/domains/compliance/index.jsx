import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard, Badge } from '../../shared/ui.jsx'
import { notices, redFlags } from '../../data/datasets.js'

function Dashboard() {
  const open = notices.filter(n=>n.status==='open').length
  const high = redFlags.filter(r=>r.risk==='high').length
  return (
    <>
      <PageHeader title="Compliance Dashboard" subtitle="Regulatory & governance — FBR · SECP · Customs" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Open Notices" value={open} sub="Require response" icon={Icons.Mail} tone="amber" />
        <KpiCard label="High Risk Flags" value={high} sub="Escalated" icon={Icons.AlertTriangle} tone="red" />
        <KpiCard label="Filings (YTD)" value={42} sub="On time: 39" icon={Icons.ClipboardCheck} tone="green" />
        <KpiCard label="Authorities" value={4} sub="FBR · SECP · Customs · PRA" icon={Icons.Building2} tone="blue" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <SectionCard title="Active Notices">
          <DataTable columns={[
            { key: 'authority', label: 'Authority', render: (r) => <Badge tone="blue">{r.authority}</Badge> },
            { key: 'subject', label: 'Subject' }, { key: 'due', label: 'Due' },
            { key: 'severity', label: 'Severity', render: (r) => <StatusBadge status={r.severity} /> },
          ]} rows={notices.filter(n=>n.status==='open').slice(0,6)} />
        </SectionCard>
        <SectionCard title="Red Flags">
          {redFlags.slice(0,6).map(r => (
            <div key={r.id} className="row between" style={{ padding: '8px 0', borderBottom: '1px solid #f0f1f3' }}>
              <div><div style={{ fontSize: 13, fontWeight: 500 }}>{r.issue}</div><div className="muted" style={{ fontSize: 11 }}>{r.area} · {r.owner}</div></div>
              <StatusBadge status={r.risk} />
            </div>
          ))}
        </SectionCard>
      </div>
    </>
  )
}
const NoticesView = (filter, title) => () => (
  <><PageHeader title={title} subtitle={`${notices.filter(filter).length} records`} />
  <DataTable columns={[
    { key: 'id', label: 'Notice #' }, { key: 'authority', label: 'Authority' }, { key: 'subject', label: 'Subject' },
    { key: 'issued', label: 'Issued' }, { key: 'due', label: 'Due' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]} rows={notices.filter(filter)} /></>
)
function RedFlagsView() {
  return (<><PageHeader title="Red Flags" subtitle="Risk register" />
    <DataTable columns={[
      { key: 'id', label: 'Flag #' }, { key: 'area', label: 'Area' }, { key: 'issue', label: 'Issue' },
      { key: 'owner', label: 'Owner' }, { key: 'risk', label: 'Risk', render: (r) => <StatusBadge status={r.risk} /> },
    ]} rows={redFlags} /></>)
}

export default function Compliance() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="fbr" element={React.createElement(NoticesView(n=>n.authority==='FBR','FBR — Federal Board of Revenue'))} />
      <Route path="secp" element={React.createElement(NoticesView(n=>n.authority==='SECP','SECP — Corporate Compliance'))} />
      <Route path="notices" element={React.createElement(NoticesView(()=>true,'All Notices'))} />
      <Route path="audit" element={React.createElement(NoticesView(n=>n.status==='responded'||n.status==='closed','Audit Trail'))} />
      <Route path="redflags" element={<RedFlagsView />} />
    </Routes>
  )
}
