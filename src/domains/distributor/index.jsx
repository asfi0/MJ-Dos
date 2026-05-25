import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard, Badge } from '../../shared/ui.jsx'
import { distributorStock, distributorSales } from '../../data/datasets.js'
import { money, num } from '../../data/seed.js'

function Dashboard() {
  const totalStock = distributorStock.reduce((s,d)=>s+d.onHand,0)
  const lowStock = distributorStock.filter(d=>d.onHand < d.reorder).length
  const salesValue = distributorSales.reduce((s,d)=>s+d.value,0)
  return (
    <>
      <PageHeader title="Distributor Dashboard" subtitle="Stock, inventory & sales — EU/GCC" />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Total Stock" value={num(totalStock)} sub={`${distributorStock.length} SKUs`} icon={Icons.Boxes} tone="green" />
        <KpiCard label="Low Stock Alerts" value={lowStock} sub="Below reorder" icon={Icons.AlertTriangle} tone="red" />
        <KpiCard label="Sales Value" value={money(salesValue)} sub="This period" icon={Icons.ShoppingCart} tone="blue" />
        <KpiCard label="Active Orders" value={distributorSales.filter(s=>s.status==='pending').length} sub="Pending fulfillment" icon={Icons.Clock} tone="amber" />
      </div>
      <SectionCard title="Stock Levels">
        <DataTable columns={[
          { key: 'sku', label: 'Product' }, { key: 'region', label: 'Region' },
          { key: 'onHand', label: 'On Hand', align: 'right', render: (r) => num(r.onHand) },
          { key: 'reorder', label: 'Reorder', align: 'right', render: (r) => num(r.reorder) },
          { key: 'status', label: 'Status', render: (r) => r.onHand < r.reorder ? <Badge tone="red">Low Stock</Badge> : <Badge tone="green">OK</Badge> },
        ]} rows={distributorStock} />
      </SectionCard>
    </>
  )
}
function Stock() {
  return (<><PageHeader title="Stock" subtitle="Distributor inventory by region" />
    <DataTable columns={[
      { key: 'sku', label: 'Product' }, { key: 'region', label: 'Region' },
      { key: 'onHand', label: 'On Hand', align: 'right', render: (r) => num(r.onHand) },
      { key: 'reserved', label: 'Reserved', align: 'right', render: (r) => num(r.reserved) },
      { key: 'price', label: 'Unit Price', align: 'right', render: (r) => money(r.price) },
    ]} rows={distributorStock} /></>)
}
function Inventory() {
  return (<><PageHeader title="Inventory" subtitle="Available vs reserved" />
    <DataTable columns={[
      { key: 'sku', label: 'Product' },
      { key: 'onHand', label: 'On Hand', align: 'right', render: (r) => num(r.onHand) },
      { key: 'reserved', label: 'Reserved', align: 'right', render: (r) => num(r.reserved) },
      { key: 'available', label: 'Available', align: 'right', render: (r) => <strong>{num(r.onHand - r.reserved)}</strong> },
      { key: 'status', label: 'Status', render: (r) => r.onHand < r.reorder ? <Badge tone="red">Reorder</Badge> : <Badge tone="green">OK</Badge> },
    ]} rows={distributorStock} /></>)
}
function Sales() {
  return (<><PageHeader title="Sales" subtitle="Customer orders" actions={<button className="btn primary"><Icons.Plus size={15}/> New Order</button>} />
    <DataTable columns={[
      { key: 'id', label: 'Order #' }, { key: 'customer', label: 'Customer' }, { key: 'sku', label: 'Product' },
      { key: 'qty', label: 'Qty', align: 'right', render: (r) => num(r.qty) },
      { key: 'value', label: 'Value', align: 'right', render: (r) => money(r.value) },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]} rows={distributorSales} /></>)
}

export default function Distributor() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="stock" element={<Stock />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="sales" element={<Sales />} />
    </Routes>
  )
}
