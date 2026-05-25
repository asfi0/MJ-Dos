import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard } from '../../shared/ui.jsx'
import { investors, payouts } from '../../data/datasets.js'
import { money } from '../../data/seed.js'

const COLORS = ['#9333ea', '#046307', '#d4af37', '#0891b2', '#64748b']

function Dashboard() {
  const totalInvested = investors.reduce((s,i)=>s+i.invested,0)
  const totalPayout = investors.reduce((s,i)=>s+i.payout,0)
  return (
    <>
      <PageHeader title="Investor Dashboard" subtitle="Capital, equity & distributions" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Total Capital" value={money(totalInvested)} sub={`${investors.length} investors`} icon={Icons.Landmark} tone="green" />
        <KpiCard label="Quarterly Payout" value={money(totalPayout)} sub="Current cycle" icon={Icons.Banknote} tone="blue" />
        <KpiCard label="Avg Return" value="8.0%" sub="Annualized" icon={Icons.TrendingUp} tone="green" />
        <KpiCard label="Next Distribution" value="Q2 2026" sub="Scheduled" icon={Icons.Calendar} tone="amber" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 16 }}>
        <SectionCard title="Equity Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={investors} dataKey="share" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e)=>`${e.share}%`}>
                {investors.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="Cap Table">
          <DataTable columns={[
            { key: 'name', label: 'Investor' },
            { key: 'share', label: 'Equity', align: 'right', render: (r) => `${r.share}%` },
            { key: 'invested', label: 'Invested', align: 'right', render: (r) => money(r.invested) },
            { key: 'payout', label: 'Payout', align: 'right', render: (r) => money(r.payout) },
          ]} rows={investors} />
        </SectionCard>
      </div>
    </>
  )
}
function Portfolio() {
  return (<><PageHeader title="Portfolio" subtitle="Investor holdings" />
    <DataTable columns={[
      { key: 'name', label: 'Investor' }, { key: 'share', label: 'Equity %', align: 'right', render: (r) => `${r.share}%` },
      { key: 'invested', label: 'Invested', align: 'right', render: (r) => money(r.invested) },
      { key: 'payout', label: 'Last Payout', align: 'right', render: (r) => money(r.payout) },
    ]} rows={investors} /></>)
}
function Payouts() {
  return (<><PageHeader title="Payouts" subtitle="Distribution history" />
    <DataTable columns={[
      { key: 'id', label: 'Payout #' }, { key: 'investor', label: 'Investor' }, { key: 'period', label: 'Period' },
      { key: 'amount', label: 'Amount', align: 'right', render: (r) => money(r.amount) },
      { key: 'date', label: 'Date' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={payouts} /></>)
}
function Statements() {
  return (<><PageHeader title="Statements" subtitle="Investor statements" />
    <div className="grid-cards">{investors.map(i => (
      <div key={i.name} className="card" style={{ padding: 18 }}>
        <Icons.FileText size={20} color="#9333ea" />
        <div style={{ fontWeight: 600, marginTop: 10 }}>{i.name}</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{i.share}% equity · {money(i.invested)}</div>
        <button className="btn" style={{ marginTop: 12, width: '100%' }}><Icons.Download size={14}/> Statement PDF</button>
      </div>
    ))}</div></>)
}

export default function Investor() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="payouts" element={<Payouts />} />
      <Route path="statements" element={<Statements />} />
    </Routes>
  )
}
