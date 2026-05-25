import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard } from '../../shared/ui.jsx'
import { journals, payables, vouchers } from '../../data/datasets.js'
import { money } from '../../data/seed.js'

function Dashboard() {
  const totalAP = payables.filter(p=>p.status!=='paid').reduce((s,p)=>s+p.amount,0)
  const overdue = payables.filter(p=>p.status==='overdue').length
  const posted = journals.filter(j=>j.status==='posted').reduce((s,j)=>s+j.debit,0)
  return (
    <>
      <PageHeader title="Finance Dashboard" subtitle="Financial position — MJ Agro Trading" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Outstanding Payables" value={money(totalAP)} sub={`${payables.filter(p=>p.status!=='paid').length} invoices`} icon={Icons.Receipt} tone="amber" />
        <KpiCard label="Overdue" value={overdue} sub="Requires attention" icon={Icons.AlertTriangle} tone="red" />
        <KpiCard label="Posted (90d)" value={money(posted)} sub="Journal entries" icon={Icons.BookOpen} tone="green" />
        <KpiCard label="Vouchers" value={vouchers.length} sub={`${vouchers.filter(v=>v.status==='pending').length} pending`} icon={Icons.FileCheck} tone="blue" />
      </div>
      <SectionCard title="Recent Journal Entries">
        <DataTable
          columns={[
            { key: 'id', label: 'Voucher #' },
            { key: 'date', label: 'Date' },
            { key: 'description', label: 'Description' },
            { key: 'account', label: 'Account' },
            { key: 'debit', label: 'Amount', align: 'right', render: (r) => money(r.debit) },
            { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          ]}
          rows={journals.slice(0, 8)}
        />
      </SectionCard>
    </>
  )
}

function Journals() {
  return (<><PageHeader title="Journal Entries" subtitle={`${journals.length} entries`} actions={<button className="btn primary"><Icons.Plus size={15}/> New Entry</button>} />
    <DataTable columns={[
      { key: 'id', label: 'JV #' }, { key: 'date', label: 'Date' },
      { key: 'description', label: 'Description' }, { key: 'account', label: 'Account' },
      { key: 'debit', label: 'Debit', align: 'right', render: (r) => money(r.debit) },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={journals} /></>)
}
function Payables() {
  return (<><PageHeader title="Accounts Payable" subtitle={`${money(payables.reduce((s,p)=>s+p.amount,0))} total`} />
    <DataTable columns={[
      { key: 'id', label: 'AP #' }, { key: 'vendor', label: 'Vendor' }, { key: 'invoice', label: 'Invoice' },
      { key: 'amount', label: 'Amount', align: 'right', render: (r) => money(r.amount) },
      { key: 'due', label: 'Due Date' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={payables} /></>)
}
function Vouchers() {
  return (<><PageHeader title="Vouchers" subtitle={`${vouchers.length} vouchers`} />
    <DataTable columns={[
      { key: 'id', label: 'Voucher #' }, { key: 'type', label: 'Type' }, { key: 'party', label: 'Party' },
      { key: 'amount', label: 'Amount', align: 'right', render: (r) => money(r.amount) },
      { key: 'date', label: 'Date' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={vouchers} /></>)
}
function Bank() {
  return (<><PageHeader title="Bank" subtitle="Account balances & reconciliation" />
    <div className="kpi-grid">
      <KpiCard label="Meezan Bank — Current" value={money(4820000)} sub="Reconciled" icon={Icons.Landmark} tone="green" />
      <KpiCard label="HBL — Export A/C" value={money(1340000)} sub="EUR linked" icon={Icons.Landmark} tone="blue" />
      <KpiCard label="Petty Cash" value={money(85000)} icon={Icons.Wallet} tone="gray" />
    </div></>)
}
function Reports() {
  return (<><PageHeader title="Finance Reports" subtitle="Statements & ledgers" />
    <div className="grid-cards">
      {['Trial Balance','Profit & Loss','Balance Sheet','Cashflow Statement','General Ledger','VAT Return'].map(r => (
        <div key={r} className="card" style={{ padding: 18 }}>
          <Icons.FileBarChart size={22} color="#16a34a" />
          <div style={{ fontWeight: 600, marginTop: 10 }}>{r}</div>
          <button className="btn" style={{ marginTop: 12, width: '100%' }}><Icons.Download size={14}/> Export</button>
        </div>
      ))}
    </div></>)
}

export default function Finance() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="journals" element={<Journals />} />
      <Route path="payables" element={<Payables />} />
      <Route path="vouchers" element={<Vouchers />} />
      <Route path="bank" element={<Bank />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  )
}
