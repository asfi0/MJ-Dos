import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard, CapacityBar, Badge } from '../../shared/ui.jsx'
import { consignments, warehouses, shipments } from '../../data/datasets.js'
import { num } from '../../data/seed.js'

function expiryTone(expiry) {
  const days = Math.round((new Date(expiry) - new Date()) / 86400000)
  if (days < 0) return { tone: 'red', label: 'Expired' }
  if (days < 60) return { tone: 'red', label: `${days}d left` }
  if (days < 180) return { tone: 'amber', label: `${days}d left` }
  return { tone: 'green', label: `${days}d left` }
}

function Dashboard() {
  const totalStock = consignments.filter(c=>c.status==='in_stock').reduce((s,c)=>s+c.qty,0)
  const inTransit = consignments.filter(c=>c.status==='in_transit').length
  const fefoRisk = consignments.filter(c => { const d = Math.round((new Date(c.expiry)-new Date())/86400000); return d < 180 }).length
  return (
    <>
      <PageHeader title="Operations Dashboard" subtitle="Inventory & logistics — MJ Agro Trading" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Total Stock" value={num(totalStock)} sub="Units in warehouses" icon={Icons.Package} tone="green" />
        <KpiCard label="Consignments" value={consignments.length} sub={`${inTransit} in transit`} icon={Icons.Boxes} tone="blue" />
        <KpiCard label="FEFO Risk" value={fefoRisk} sub="Expiring < 180d" icon={Icons.Clock} tone="amber" />
        <KpiCard label="Active Shipments" value={shipments.filter(s=>s.status==='in_transit').length} sub="Outbound" icon={Icons.Truck} tone="blue" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <SectionCard title="Warehouse Capacity">
          {warehouses.map(w => (
            <div key={w.name} style={{ marginBottom: 16 }}>
              <div className="row between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{w.name}</span>
                <span className="muted" style={{ fontSize: 12 }}>{w.items} SKUs</span>
              </div>
              <CapacityBar used={w.used} capacity={w.capacity} />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="FEFO Queue — Nearest Expiry">
          <DataTable
            columns={[
              { key: 'sku', label: 'Product' },
              { key: 'batch', label: 'Batch' },
              { key: 'expiry', label: 'Expiry', render: (r) => { const e = expiryTone(r.expiry); return <Badge tone={e.tone}>{e.label}</Badge> } },
            ]}
            rows={[...consignments].sort((a,b)=>a.expiry.localeCompare(b.expiry)).slice(0,6)}
          />
        </SectionCard>
      </div>
    </>
  )
}

function Consignments() {
  return (<><PageHeader title="Consignments" subtitle={`${consignments.length} consignments`} actions={<button className="btn primary"><Icons.Plus size={15}/> New Consignment</button>} />
    <DataTable columns={[
      { key: 'id', label: 'Consignment #' }, { key: 'sku', label: 'Product' }, { key: 'batch', label: 'Batch' },
      { key: 'qty', label: 'Qty', align: 'right', render: (r) => num(r.qty) },
      { key: 'warehouse', label: 'Warehouse' }, { key: 'expiry', label: 'Expiry' },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={consignments} /></>)
}
function Warehouse() {
  return (<><PageHeader title="Warehouse" subtitle="Capacity & utilization" />
    <div className="grid-cards">{warehouses.map(w => (
      <div key={w.name} className="card" style={{ padding: 18 }}>
        <div className="row gap-2" style={{ marginBottom: 14 }}><Icons.Warehouse size={20} color="#ea580c" /><strong>{w.name}</strong></div>
        <CapacityBar used={w.used} capacity={w.capacity} />
        <div className="row between" style={{ marginTop: 14, fontSize: 12 }}><span className="muted">{w.items} SKUs stored</span></div>
      </div>
    ))}</div></>)
}
function Fefo() {
  return (<><PageHeader title="FEFO Queue" subtitle="First-Expiry-First-Out priority" />
    <DataTable columns={[
      { key: 'sku', label: 'Product' }, { key: 'batch', label: 'Batch' },
      { key: 'qty', label: 'Qty', align: 'right', render: (r) => num(r.qty) },
      { key: 'warehouse', label: 'Warehouse' },
      { key: 'expiry', label: 'Expiry', render: (r) => { const e = expiryTone(r.expiry); return <Badge tone={e.tone}>{r.expiry} · {e.label}</Badge> } },
    ]} rows={[...consignments].sort((a,b)=>a.expiry.localeCompare(b.expiry))} /></>)
}
function Inventory() {
  return (<><PageHeader title="Inventory" subtitle="Stock on hand by product" />
    <DataTable columns={[
      { key: 'sku', label: 'Product' }, { key: 'batch', label: 'Batch' },
      { key: 'qty', label: 'On Hand', align: 'right', render: (r) => num(r.qty) },
      { key: 'warehouse', label: 'Location' },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={consignments.filter(c=>c.status==='in_stock')} /></>)
}
function Shipments() {
  return (<><PageHeader title="Shipments" subtitle={`${shipments.filter(s=>s.status==='in_transit').length} in transit`} actions={<button className="btn primary"><Icons.Plus size={15}/> New Shipment</button>} />
    <DataTable columns={[
      { key: 'id', label: 'Shipment #' }, { key: 'destination', label: 'Destination' }, { key: 'sku', label: 'Product' },
      { key: 'qty', label: 'Qty', align: 'right', render: (r) => num(r.qty) },
      { key: 'carrier', label: 'Carrier' }, { key: 'eta', label: 'ETA' },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={shipments} /></>)
}

export default function Operations() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="consignments" element={<Consignments />} />
      <Route path="warehouse" element={<Warehouse />} />
      <Route path="fefo" element={<Fefo />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="shipments" element={<Shipments />} />
    </Routes>
  )
}
