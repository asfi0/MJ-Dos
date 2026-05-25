import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard } from '../../shared/ui.jsx'
import { monthlyRevenue, channelMix, boardReports } from '../../data/datasets.js'
import { money } from '../../data/seed.js'

const PIE_COLORS = ['#046307', '#16a34a', '#d4af37', '#0891b2']

function Dashboard() {
  const totalRev = monthlyRevenue.reduce((s,m)=>s+m.revenue,0)
  const totalCost = monthlyRevenue.reduce((s,m)=>s+m.cost,0)
  const margin = Math.round(((totalRev-totalCost)/totalRev)*100)
  return (
    <>
      <PageHeader title="Reporting Dashboard" subtitle="Business intelligence & KPIs" actions={<button className="btn primary"><Icons.Download size={15}/> Export Board Pack</button>} />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Revenue (10mo)" value={money(totalRev)} sub="All channels" icon={Icons.TrendingUp} tone="green" />
        <KpiCard label="Gross Margin" value={`${margin}%`} sub="Blended" icon={Icons.Percent} tone="blue" />
        <KpiCard label="Board Reports" value={boardReports.length} sub={`${boardReports.filter(r=>r.status==='final').length} final`} icon={Icons.FileBarChart} tone="gray" />
        <KpiCard label="Export Markets" value={4} sub="FR · DE · GCC · Local" icon={Icons.Globe} tone="amber" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 16 }}>
        <SectionCard title="Revenue vs Cost — Monthly">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v)=>`${v/1000}k`} />
              <Tooltip formatter={(v)=>money(v)} />
              <Bar dataKey="revenue" fill="#046307" radius={[4,4,0,0]} />
              <Bar dataKey="cost" fill="#d4af37" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="Channel Mix">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={channelMix} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e)=>`${e.value}%`}>
                {channelMix.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
      <SectionCard title="Recent Board Reports">
        <DataTable columns={[
          { key: 'title', label: 'Report' }, { key: 'period', label: 'Period' }, { key: 'generated', label: 'Generated' },
          { key: 'format', label: 'Format', render: (r) => <span className="badge gray">{r.format}</span> },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ]} rows={boardReports} />
      </SectionCard>
    </>
  )
}
function Board() {
  return (<><PageHeader title="Board Reports" subtitle="Governance reporting" />
    <DataTable columns={[
      { key: 'title', label: 'Report' }, { key: 'period', label: 'Period' }, { key: 'generated', label: 'Generated' },
      { key: 'format', label: 'Format' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={boardReports} /></>)
}
function Kpis() {
  return (<><PageHeader title="KPIs" subtitle="Key performance indicators" />
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={monthlyRevenue}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 11 }} tickFormatter={(v)=>`${v/1000}k`} />
        <Tooltip formatter={(v)=>money(v)} /><Line type="monotone" dataKey="revenue" stroke="#046307" strokeWidth={2.5} dot={{r:3}} />
      </LineChart>
    </ResponsiveContainer></>)
}
function Exports() {
  return (<><PageHeader title="Exports" subtitle="Download center" />
    <div className="grid-cards">{boardReports.map(r => (
      <div key={r.id} className="card" style={{ padding: 18 }}>
        <div className="row between"><Icons.FileText size={20} color="#0891b2" /><span className="badge gray">{r.format}</span></div>
        <div style={{ fontWeight: 600, marginTop: 10 }}>{r.title}</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{r.period}</div>
        <button className="btn" style={{ marginTop: 12, width: '100%' }}><Icons.Download size={14}/> Download</button>
      </div>
    ))}</div></>)
}

export default function Reporting() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="board" element={<Board />} />
      <Route path="kpis" element={<Kpis />} />
      <Route path="exports" element={<Exports />} />
    </Routes>
  )
}
